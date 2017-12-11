import {Injectable, EventEmitter} from '@angular/core';
import {Vendor} from "../vendor";

@Injectable()
export class VendorDialogService {

  private showCreateDialogEvent: EventEmitter<void> = new EventEmitter<void>();
  private showEditDialogEvent: EventEmitter<Vendor> = new EventEmitter();

  public showCreateDialog() {
    this.showCreateDialogEvent.emit();
  }

  public showEditDialog(vendor: Vendor) {
    this.showEditDialogEvent.emit(vendor);
  }

  public subscribeToCreateEvent(generatorOrNext?: any, error?: any, complete?: any): any {
    return this.showCreateDialogEvent.subscribe(generatorOrNext, error, complete);
  }

  public subscribeToEditEvent(generatorOrNext?: any, error?: any, complete?: any): any {
    return this.showEditDialogEvent.subscribe(generatorOrNext, error, complete);
  }

}
