import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmptyFieldPipe } from 'src/app/pipe/EmptyFieldPipe';
import { UserService } from 'src/app/service/Home/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {


  userForm!: FormGroup;

  constructor(private auth: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      "fullname": new FormControl(null),
      "email": new FormControl(null),
      "username": new FormControl(null, [Validators.required]),
      "password": new FormControl(null, [Validators.required]),
    })
  }

  onSubmit() {
    if (this.userForm.valid) {
      let username = this.userForm.get('username')?.value
      let password = this.userForm.get('password')?.value


      this.auth.register(username, password).subscribe({
        next: (response: any) => {
          console.log(response);
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
            this.router.navigate(['login'])
          });
        },
        error: (error) => {
          console.log(error);
        }
      })

    } else {
      if (this.userForm.get('username')?.hasError('required')) {
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
      } else if (this.userForm.get('password')?.hasError('required')) {
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
