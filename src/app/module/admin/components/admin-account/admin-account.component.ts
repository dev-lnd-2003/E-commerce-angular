import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/User';
import { AdminAccountService } from 'src/app/service/Admin/admin-account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.css']
})
export class AdminAccountComponent implements OnInit {

  user: User[] = []
  roles = [
    { name: "CHỌN VAI TRÒ", description: "SELECT_ROLE" },
    { name: "ADMIN", description: "ADMIN" },
    { name: "CUSTOMER", description: "CUSTOMER" },
  ];


  role: string = "CHỌN VAI TRÒ";

  lockStatus: boolean = true;

  adminForm!: FormGroup;

  constructor(private adminAccountService: AdminAccountService) { }

  ngOnInit(): void {
    this.findAll();
    this.adminForm = new FormGroup({
      "username": new FormControl(null, [Validators.required]),
      "password": new FormControl(null, [Validators.required]),
    })
  }

  findAll() {
    this.adminAccountService.findAllAccount().subscribe(
      {
        next: (response) => {
          this.user = response
          console.log(response);

        }
      }
    )
  }

  lockOrUnlock(username: string, type: boolean) {
    let messe = type === true ? 'khoá' : 'mở khoá';

    Swal.fire({
      title: "Xác nhận hành động",
      text: `Bạn muốn ${messe} tài khoản ${username} này?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đúng"
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminAccountService.lockOrUnlockUser(username).subscribe(
          {
            next: (response) => {
              let mess
              if (type === true) {
                mess = 'Khóa thành công';
              } else {
                mess = 'Mở khóa thành công';
              }
              Swal.fire({
                title: "Thông báo",
                text: mess,
                icon: "success",
              }).then(() => {
                window.location.reload();
              });

            },
            error: (error: any) => {
              console.log(error);
            }
          }
        )
      }
    })
  }

  roleSelectionChanged() {
    if (this.role !== "CHỌN VAI TRÒ") {
      this.adminAccountService.findAllByRole(this.role).subscribe({
        next: (response) => {
          this.user = response;
        },
        error: (error) => {
          console.log(error);
        }
      });
    } else {
      this.findAll();
    }
  }
  onLockStatusChange() {
    this.adminAccountService.findAllUserLockOrUnlock(this.lockStatus).subscribe({
      next: (response) => {
        this.user = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onSubmit() {
    if (this.adminForm?.valid) {
      let username = this.adminForm.get('username')?.value
      let password = this.adminForm.get('password')?.value
      this.adminAccountService.addAdmin(username, password).subscribe({
        next: (response) => {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            text: 'Tạo thành công',
          }).then(() => {
            this.findAll()
          })
        },
        error: (error) => {
          console.log(error);
        }
      })
    } else {
      if (this.adminForm.get('username')?.hasError('required')) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "error",
          text: 'Không bỏ trống tài khoản',
        });
      } else if (this.adminForm.get('password')?.hasError('required')) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "error",
          text: 'Không bỏ trống mật khẩu',
        });
      }
    }
  }
}
