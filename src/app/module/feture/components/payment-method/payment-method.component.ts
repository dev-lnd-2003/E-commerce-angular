import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserPaymentMethodService } from 'src/app/service/Home/UserPaymentMethod.service';
import { UserService } from 'src/app/service/Home/user.service';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit {

  paymentType = [
    // { value: 'TTD', label: 'Thẻ Tín Dụng/Ghi Nợ' },
    { value: 'TTKNH', label: 'Thanh Toán Khi Nhận Hàng' }
  ];

  provider = [
    { value: 'HT', label: 'Hoả Tốc' },
    { value: 'GHTK', label: 'Giao Hàng Tiết Kiệm' }
  ]

  @Input() shipAddress: string | undefined
  @Input() username: string | undefined;

  formPaymentMethod!: FormGroup

  constructor(
    private auth: UserService,
    private userPaymentMethodService: UserPaymentMethodService,
    private formBuilder: FormBuilder,
  ) {
    this.formPaymentMethod = this.formBuilder.group({
      paymentType: ["", Validators.compose([Validators.required])],
      provider: ["", Validators.compose([Validators.required])],
      expiry: [""]
    })
    this.formPaymentMethod.get('provider')?.valueChanges.subscribe(value => {
      this.updateExpiry(value);
    });
  }

  ngOnInit(): void {

  }
  onSubmit() {
    const userPaymentData = {
      user: this.auth.getUser(),
      paymentType: this.formPaymentMethod.value.paymentType,
      provider: this.formPaymentMethod.value.provider,
      expiry: this.formPaymentMethod.value.expiry
    }
    if (this.username) {
      this.userPaymentMethodService.createOrUpdateUserAddress(this.username, userPaymentData).subscribe(
        {
          next: (response) => {
            console.log(response);
          },
          error: (error) => {
            console.log(error);
          }
        }
      )
    }

  }
  private updateExpiry(selectedShip: string) {
    let expiry = new Date();

    if (selectedShip === 'HT') {
      expiry.setDate(expiry.getDate() + 1);
    } else if (selectedShip === 'GHTK') {
      expiry.setDate(expiry.getDate() + 7);
    }

    const formattedExpiry = this.formatDate(expiry);
    this.formPaymentMethod.patchValue({
      expiry: formattedExpiry
    });
  }

  private formatDate(date: Date): string {
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    const yyyy = date.getFullYear();

    const mmString = mm < 10 ? '0' + mm : mm.toString();
    const ddString = dd < 10 ? '0' + dd : dd.toString();

    return yyyy + '-' + mmString + '-' + ddString;
  }
}
