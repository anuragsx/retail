import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class RetailScreenService {
	constructor(private http: Http) {}
	
	getItems() {     
		return this.http.get('https://api-dev.onyxapp.us/products').map(	response => 	{
				return response.json() || {success: false, message: "No response from server"};
			}).catch((error: Response | any) => {
				return Observable.throw(error.json());
			}).toPromise();		 			       
    }

}