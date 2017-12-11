import {Component, OnInit} from "@angular/core";
import {VendorStore} from "./vendor-store.service";
import {Observable} from "rxjs";
import {Vendor} from "./vendor";

@Component({
  selector: 'app-vendors-table',
  templateUrl: 'vendors-table.component.html',
  styleUrls: ['vendors-table.component.css']
})
export class VendorsTableComponent implements OnInit {

  vendors: Observable<Vendor[]>;
  selectedVendor: Vendor;

  constructor(private store: VendorStore) { }

  ngOnInit() {
    this.vendors = this.store.getVendors();
  }

  selected(vendor: Vendor): string {
    return this.selectedVendor == vendor ? "selected-row" : "";
  }

}
