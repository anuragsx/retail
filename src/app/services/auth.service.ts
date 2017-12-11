import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  public ERROR_MESSAGE: string = "";
  constructor() { }
  isClientLogIn() {
    if ( localStorage.getItem('isLogin') ) {
      return true;
    }
    return false;
  }
  login() {
    localStorage.setItem('isLogin', '1');
  }
  logout() {
    localStorage.removeItem('isLogin');
  }
}
