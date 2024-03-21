
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAddress } from 'src/app/model/UserAddress';
import { UserAddressService } from 'src/app/service/Home/UserAddress.service';
import { CartShoppingService } from 'src/app/service/Home/cart-shopping.service';
import { UserService } from 'src/app/service/Home/user.service';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.css']
})
export class UserAddressComponent implements OnInit {

  formInfoUser!: FormGroup;
  date = new Date()
  complete = false
  userAddress!: UserAddress

  @Input() username: string | undefined;


  constructor(
    private auth: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private userAddressService: UserAddressService
  ) {
    this.formInfoUser = this.formBuilder.group({
      fullName: ["", Validators.compose([Validators.required])],
      mobile: ["", Validators.compose([Validators.minLength(10), Validators.required])],
      address: ["", Validators.compose([Validators.required])],
      city: ["", Validators.compose([Validators.required])],
      country: ["", Validators.compose([Validators.required])],
      postCode: ["", Validators.compose([Validators.required])]
    });
  }


  ngOnInit(): void {
    this.showInfoUserAddress();
  }

  showInfoUserAddress() {
    if (this.username) {
      this.userAddressService.getUserAddress(this.username).subscribe(
        {
          next: (response) => {
            this.userAddress = response
            this.initializeForm();
          },
          error: (error) => {
            console.log(error);
          }
        }
      )
    } else {
      if (!this.auth.isAuthenticated()) {
        this.router.navigate(['login']);
      }
    }
  }

  initializeForm() {
    if (this.userAddress) {
      this.formInfoUser = this.formBuilder.group({
        fullName: [this.userAddress.fullName, Validators.compose([Validators.required])],
        mobile: [this.userAddress.mobile, Validators.compose([Validators.minLength(10), Validators.required])],
        address: [this.userAddress.address, Validators.compose([Validators.required])],
        city: [this.userAddress.city, Validators.compose([Validators.required])],
        country: [this.userAddress.country, Validators.compose([Validators.required])],
        postCode: [this.userAddress.postCode, Validators.compose([Validators.required])]
      });
    }

  }

  onSubmit() {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
    }
    if (this.formInfoUser.invalid) {
      return;
    }
    const userAddressData = {
      user: this.auth.getUser(),
      fullName: this.formInfoUser.value.fullName,
      mobile: this.formInfoUser.value.mobile,
      address: this.formInfoUser.value.address,
      city: this.formInfoUser.value.city,
      country: this.formInfoUser.value.country,
      postCode: this.formInfoUser.value.postCode
    };
    if (this.username !== undefined) {
      this.userAddressService.createOrUpdateUserAddress(this.username, userAddressData).subscribe(
        {
          next: (response) => {
            console.log(response);

          },
          error: (error) => {
            console.log(error);

          }
        }
      )
    } else {
      // Xử lý trường hợp khi username là undefined (nếu cần)
      console.log("Lỗi");

    }



  }
}
