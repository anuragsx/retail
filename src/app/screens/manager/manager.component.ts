import { NAVBAR } from './navbar/navbar.service';
import { Component, OnInit } from '@angular/core';
import { NavBarService } from 'app/screens/manager/navbar/navbar.service';


declare var Highcharts: any;

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  options: any;
  activeMenu: string;
  navbars: any;
  isMenu: boolean = true;
  constructor(private _navbar: NavBarService) {
    this._navbar.onOpenNavbar(( menu: string ) => {
      this.activeMenu = menu;
      if ( menu === NAVBAR.ANALITICS.MENU1 ) {
        setTimeout(() => {
          this.initCharts();
        }, 100);
      }
    });
    this.navbars = NAVBAR;
  }

  ngOnInit() {
    this._navbar.open(NAVBAR.ANALITICS.MENU1);
  }

  openMenu(event: any, menu: string) {
    this._navbar.open(menu);
  }

  isActive(menu: string) {
    return NAVBAR.ANALITICS.MENU1 === menu;
  }

  initCharts() {
    this.options = {
      data: {
        table: 'datatable',
        rows: [20, 40, 60, 80]
      },
      chart: {
        type: 'column'
      },
      title: {
        text: '<b>Wildlife Population</b>'
      },
      yAxis: {
        allowDecimals: true,
        title: {
          text: ''
        }
      },
      tooltip: {
        formatter: function () {
          return '<b>' + this.series.name + '</b><br/>' + this.point.y + ' ' + this
            .point
            .name
            .toLowerCase();
        }
      }
    };
    Highcharts.chart('container-chart', this.options);
  }
}
