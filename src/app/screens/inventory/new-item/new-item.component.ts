import { Item } from './item.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Api } from 'common/api.service';
import 'notifyjs';

declare var $: any;

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private _fb: FormBuilder, private _api: Api) { }

  ngOnInit() {
    this._createForms().subscribe( value => {
      console.log('Form value', value)
    });
  }
  save() {
    this.onFormSubmit(this.formGroup.value, this.formGroup.valid);
  }
  new() {

  }
  cancel() {

  }
  onFormSubmit(value: Item, isValid: boolean) {
    if ( isValid ) {
      this._api.saveInventoryItem(value, (err: any, data: Item) => {
        if ( err ) {
          $.notify('Save inventory error ' + err, 'error' );
        } else {
          $.notify('Save inventory succesfuly', 'success' );
        }
      });

    }
  }
  _createForms() {
    this.formGroup = this._fb.group({
      description: [],
      additionalDescription1: [],
      additionalDescription2: [],
      reference: [],
      barCode: [],
      type: []
    });
    return this.formGroup.valueChanges;
  }

}
