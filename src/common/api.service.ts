import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../app/services/auth.service';
import { Router } from '@angular/router';
import { Headers, Http, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Injectable } from '@angular/core';
import { Item } from 'app/screens/inventory/new-item/item.model';
import { environment } from '../environments/environment';


@Injectable()
export class Api {
  baseUrl: string = environment.apiUrl;
  baseUrlLocal: string = environment.apiUrlLocal;
  errorMessage: string = '';
  constructor(private _http: Http, private _auth: AuthService) {}

  /**
   * Send post to API
   * @param url
   * @param data
   * @param cb
   */
  private sendPOST(url: string, data: any, cb?: Function) {
    const headers: Headers = new Headers({'Content-Type': 'application/json'});
    const opt = new RequestOptions({headers: headers});
    this._http.post(`${this.baseUrl}/${url}`, data, opt)
      .subscribe(
        resp => {
          cb(null, resp.json());
        },
        error => {
          cb(error, null);
        }
      );
  }
  /**
   * Check pincode API
   * @param pincode
   * @param router
   */
  checkPincode(pincode: string, router: Router) {
    this.sendPOST('pincode/check', { pincode: pincode }, (error: any, resp: any) => {
      if ( !error ) {
        if ( (resp.data && resp.data.status === 'OK') || resp.pincode ) {
          this._auth.login();
          // router.navigate(['screens/order']);
        }
      } else {
        let err = error.json();
        if ( err.data ) {
          this.errorMessage = err.data.message;
        }
      }
    });
  }
  /**
   * sendPayment
   * @param amount
   */
  sendPayment(amount: number) {
    this.sendPOST('payment/amount', { amount: amount }, (error: any, resp: any) => {
      if ( !error ) {
        if ( resp.data && resp.data.status === 'OK' ) {
          // router.navigate(['payment']);
          // @TODO: If all okay it will go to next screen
        }
      }
    });
  }
  /**
   *
   * @param item Save Inventry Item API
   */
  saveInventoryItem(item: Item, cb?: Function) {
    this.sendPOST('inventory/item', item, (error: any, resp: any) => {
      if ( !error ) {
        return cb(null, resp);
      }
      return cb(error, null);
    });
  }

  /**
   * Api get tree department
   */
  getAllNodeDepartment() {
    return this._http.get(environment.apiUrlLocal + "/departments")
        .toPromise()
        .then( (res: any) => {
          var body = res.json();
          return body;
        })
        .catch((error: any) => {
          // In a real world app, we might use a remote logging infrastructure
          let err = error.json();
          let msg : string = '';
          if ( err.data ) {
            msg = err.data.message;
          }
          return Promise.reject(msg);
        });
  };

    /**
   * Api create tree department
   */
  createNodeDepartment(data: any) {
    return this._http.post( environment.apiUrlLocal + "/department", data)
        .toPromise()
        .then( (res: any) => {
          var body = res.json();
          return body;
        })
        .catch((error: any) => {
          // In a real world app, we might use a remote logging infrastructure
          let err = error.json().message;
          // let msg : string = '';
          // if ( err.data ) {
          //   msg = err.data.message;
          // }
          return Promise.reject(err);
        });
  };

  /**
   * Api delete tree department
   */
  deleteNodeDepartment(data: any) {
    return this._http.delete( environment.apiUrlLocal + "/department/" + data._id , data)
        .toPromise()
        .then( (res: any) => {
          var body = res.json();
          console.log('4444444444444444444444', body);
          return body;
        })
        .catch((error: any) => {
          // In a real world app, we might use a remote logging infrastructure
          let err = error.json().message;
          // let msg : string = '';
          // if ( err.data ) {
          //   msg = err.data.message;
          // }
          return Promise.reject(err);
        });
  };

  
  /**
   * Api update tree department
   */
  updateNodeDepartment(data: any) {
    return this._http.put("http://localhost:3232/api/v1/department/" + data._id , data)
        .toPromise()
        .then( (res: any) => {
          var body = res.json();
          return body;
        })
        .catch((error: any) => {
          // In a real world app, we might use a remote logging infrastructure
          let err = error.json().message;
          // let msg : string = '';
          // if ( err.data ) {
          //   msg = err.data.message;
          // }
          return Promise.reject(err);
        });
  };


}
