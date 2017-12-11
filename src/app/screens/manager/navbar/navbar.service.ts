import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

export const NAVBAR = {
  ANALITICS: { MENU1: 'MENU1' },
  INVENTORY: { 
    NEW_ITEM: 'NEW_ITEM',
    DEPARTMENT: 'DEPARTMENT' 
  },
  ADMINISTRATION: { VENDORS: 'VENDORS' }
};

@Injectable()
export class NavBarService {

  public activeNavbar: BehaviorSubject<string> = new BehaviorSubject<string>('');
  constructor() { }

  open(menu: string) {
    this.activeNavbar.next(menu);
  }

  onOpenNavbar(fn: (value: string) => void) {
    return this.activeNavbar.subscribe(fn);
  }
}
