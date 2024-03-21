import { NgForm } from '@angular/forms';
import { UserService } from './../../../../service/Home/user.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from 'src/app/model/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user!: User;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  login(form: NgForm) {
    let username = form.value.username;
    let password = form.value.password;

    this.userService.login(username, password).subscribe({
      next: (response: any) => {
        const token = response.token;
        const user = response.userDto
        this.userService.setToken(token);
        this.userService.setUser(user);

        this.router.navigate(['home']).then(() => {
          location.reload();
        })
      },
      error: (error) => {

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
          icon: "warning",
          title: "Kiểm tra lại toàn khoản mật khẩu"
        });
      },

    });



  }
}
