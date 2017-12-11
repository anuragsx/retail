import { Directive, Component, OnInit, ElementRef,AfterViewInit, Renderer, ViewChild, ViewEncapsulation } from '@angular/core';
import { RetailScreenService } from './retail-screen.service';
import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'app-retail-screen',
  templateUrl: './retail-screen.component.html',
  styleUrls: ['./retail-screen.component.css'],
  providers: [RetailScreenService]//,
  //encapsulation: ViewEncapsulation.Native
})

export class RetailScreenComponent implements OnInit {
  

	country: any;

  items: any[];

  itemArray: any[]= [];

  filteredItemsSingle: any[];

  filteredCountriesMultiple: any[];

  constructor(private retailScreenService: RetailScreenService, private renderer: Renderer) { }

  @ViewChild('float-input') el:ElementRef;

  ngAfterViewInit()
  {
    document.getElementById('float-input').focus();  
  }
   
  public text: string

  selectedItems: any[] = [];

  finalSelectedItems: any[] = [];

  ngOnInit() {
    this.itemArray = [];
    this.selectedItems = [];
    this.finalSelectedItems = [];
  }
    

  filterItemSingle(event) {
    let query = event.query;
    this.retailScreenService.getItems().then(response => {
      console.log("Got response:", response);
      this.filteredItemsSingle = this.filterItem(query, response);
      console.log("single item:", this.filteredItemsSingle);
    }).catch(error => {
      console.log("Got error:", error);
    }).then(response => {
      console.log("Another response:", response);
    }).catch(error => {
      console.log("Got another error:", error);
    });
  }

  filterItem(query, items: any[]):any[] {
      let filtered : any[] = [];
      let filteredObj : any[] = [];
      for(let i = 0; i < items.length; i++) {
          let item = items[i];
          if(item.productName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filtered.push(item.productName);
              filteredObj.push(item);

          }
      }
      this.itemArray = filteredObj;
      return filtered;
    }  

  displayProducts(value) {
    for (let item of this.itemArray) {
        if(item.productName == this.text) {
          this.selectedItems.push(item);
        } 
    }
    this.text = '';
  } 

  subTotal() {
    let total = [];
    for (let item of this.selectedItems) { 
      total.push(item.Price);
    }
    var sum = total.reduce((a, b) => a + b, 0);
    return sum;
  }

  reset() {
    this.selectedItems = [];
  }


}