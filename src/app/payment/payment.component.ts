import { Api } from '../../common/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentDigits: Array<string> = [];
  form: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _api: Api,
  ) {
    this._createForm();
  }

  ngOnInit() {
  }

  placeDigit(digit: number) {
    this.paymentDigits.push(String(digit));
    this.form.get('amount').setValue(this.paymentDigits.join(''));
  }
  /**
   * Format digits with 0.00 floating numbers
   */
  formatDigits() {
    let value = this.paymentDigits.filter( value => value === '.');
    if ( value.length > 0 ) {
      return;
    }
    if( this.paymentDigits.length >= 3 ) {
      this.paymentDigits.splice(this.paymentDigits.length - 2, 0, '.');
    } else {
      this.paymentDigits.push('.')
    }
    this.form.get('amount').setValue(this.paymentDigits.join(''));
  }

  clearDigits() {
    this.paymentDigits = [];
    this.form.get('amount').setValue(this.paymentDigits.join(''));
  }

  sendPayment() {
    try {
      let { value } = this.form.get('amount');
      this._api.sendPayment(parseFloat(value));
    } catch(e) {
      console.log("Parse amount error");
    }
  }

  private _createForm() {
    this.form = this._fb.group({
      amount: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]]
    });
  }

}
