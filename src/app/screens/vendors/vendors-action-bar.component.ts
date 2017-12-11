import {Component, OnInit, Input} from '@angular/core';
import {Vendor} from "./vendor";
import {VendorStore} from "./vendor-store.service";
import {VendorDialogService} from "./vendor-dialog/vendor-dialog.service";

@Component({
  selector: 'app-vendors-action-bar',
  templateUrl: 'vendors-action-bar.component.html',
  styleUrls: ['vendors-action-bar.component.css']
})
export class VendorsActionBarComponent {

  @Input() selectedVendor: Vendor = new Vendor();

  constructor(private vendorService: VendorDialogService, private store: VendorStore) { }

  showCreateDialog() {
    this.vendorService.showCreateDialog();
  }

  showEditDialog() {
    this.vendorService.showEditDialog(this.selectedVendor)
  }

  delete() {
    this.store.deleteVendor(this.selectedVendor);
  }

}
