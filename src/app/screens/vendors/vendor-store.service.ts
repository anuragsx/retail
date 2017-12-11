import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Vendor} from "./vendor";

const url = "https://api-dev.onyxapp.us/vendors";

@Injectable()
export class VendorStore {

  protected entities: BehaviorSubject<Vendor[]> = new BehaviorSubject([]);

  private headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  private reqOptions = {
    headers: this.headers
  };

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  protected loadInitialData(): void {
    this.http.get(url).subscribe((data: Vendor[]) => {
      this.entities.next(data);
    });
  }

  public getVendors(): Observable<Vendor[]> {
    return this.entities.asObservable();
  }

  public createVendor(vendor: Vendor) {
    this.http.post(url, JSON.stringify(vendor), this.reqOptions).subscribe((vendor: Vendor) => {
      const vendors: Vendor[] = this.entities.getValue();
      vendors.push(vendor);
      this.entities.next(vendors);
    });
  }

  public editVendor(vendor: Vendor) {
    this.http.put(url + "/" + vendor.id, JSON.stringify(vendor), this.reqOptions).subscribe((vendor: Vendor) => {
      const vendors: Vendor[] = this.entities.getValue();
      const index: number = this.findIndexById(vendor);
      vendors[index] = vendor;
      this.entities.next(vendors);
    });
  }

  public deleteVendor(vendor: Vendor) {
    this.http.delete(url + "/" + vendor.id, this.reqOptions).subscribe(() => {
      const vendors: Vendor[] = this.entities.getValue();
      const index: number = this.findIndexById(vendor);
      vendors.splice(index, 1);
      this.entities.next(vendors);
    });
  }

  private findIndexById(vendor: Vendor) {
    const vendors: Vendor[] = this.entities.getValue();
    for (let i = 0; i < vendors.length; i++) {
      if (vendor.id == vendors[i].id)
        return i;
    }
    return -1;
  }

}
