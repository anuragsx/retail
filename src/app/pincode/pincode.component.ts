import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { Api } from '../../common/api.service';

@Component({
  selector: 'app-pincode',
  templateUrl: './pincode.component.html',
  styleUrls: ['./pincode.component.css']
})
export class PincodeComponent implements OnInit {

  pincodeDigits: Array<number> = [];
  form: FormGroup;
  date: Date = new Date();
  constructor(
    private _fb: FormBuilder,
    public _api: Api,
    public _auth: AuthService,
    private _router: Router
  ) {
    this._createForm();
  }
  _getTimeString() {
    return this.date.toLocaleTimeString();
  }
  _getDateString() {
    return this.date.toLocaleDateString();
  }
  _createForm() {
    this.form = this._fb.group({
      pincode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]]
    });
    this.form.controls['pincode'].valueChanges.subscribe( value => {
      if (value == 1234) {
         this._router.navigate(['/retail-screen']);
        this._api.errorMessage = '';
        this._auth.ERROR_MESSAGE = '';
      }
    });
  }

  placeNumber(digit: number) {
    this.pincodeDigits.push(digit);
    this.form.get('pincode').setValue(this.pincodeDigits.join(''));
  }

  clearDigits() {
    this.pincodeDigits = [];
    this.form.get('pincode').setValue(this.pincodeDigits.join(''));
  }

  checkPincode(value: string) {
    this._api.checkPincode(
      this.form.get('pincode').value,
      this._router
    );
    this.clearDigits();
  }


  ngOnInit() {}

}
