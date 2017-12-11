import {Component, ViewChild, ElementRef, OnInit, ViewEncapsulation} from "@angular/core";
import {VendorDialogService} from "./vendor-dialog.service";
import {Vendor} from "../vendor";
import {VendorStore} from "../vendor-store.service";

declare var jQuery:any;

const create = "create";
const edit = "edit";

@Component({
  selector: 'app-vendor-dialog',
  templateUrl: './vendor-dialog.component.html',
  styleUrls: ['./vendor-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VendorDialogComponent implements OnInit {

  @ViewChild('modal') dialog: ElementRef;

  vendor: Vendor = new Vendor();

  private mode: string;

  constructor(private dialogService: VendorDialogService, private store: VendorStore) { }

  ngOnInit(): void {
    this.dialogService.subscribeToCreateEvent(() => {
      this.vendor = new Vendor();
      this.mode = create;
      this.show();
    });
    this.dialogService.subscribeToEditEvent((vendor: Vendor) => {
      this.vendor = Object.assign({}, vendor);
      this.mode = edit;
      this.show();
    });
  }

  private show() {
    jQuery(this.dialog.nativeElement).modal('show');
  }

  private hide() {
    jQuery(this.dialog.nativeElement).modal('hide');
  }

  isCreateMode(): boolean {
    return this.mode == create;
  }

  clear() {
    const id: number = this.vendor.id;
    this.vendor = new Vendor();
    this.vendor.id = id;
  }

  create() {
    this.store.createVendor(this.vendor);
    this.hide();
  }

  edit() {
    this.store.editVendor(this.vendor);
    this.hide();
  }

}
