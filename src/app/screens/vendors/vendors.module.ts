import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VendorDialogService} from "./vendor-dialog/vendor-dialog.service";
import {VendorStore} from "./vendor-store.service";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {VendorsActionBarComponent} from "./vendors-action-bar.component";
import {VendorDialogComponent} from "./vendor-dialog/vendor-dialog.component";
import {VendorsTableComponent} from "./vendors-table.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    VendorsTableComponent,
    VendorsActionBarComponent,
    VendorDialogComponent
  ],
  exports: [
    VendorsTableComponent
  ],
  providers: [
    VendorStore,
    VendorDialogService
  ]
})
export class VendorsModule { }
