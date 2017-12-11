import { AuthService } from './services/auth.service';
import { Api } from '../common/api.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

// import { ChartModule  } from "angular-highcharts";

import { AppComponent } from './app.component';
import { PincodeComponent } from './pincode/pincode.component';
import { PaymentComponent } from './payment/payment.component';
import { ManagerComponent } from './screens/manager/manager.component';
import { OrderComponent } from './screens/order/order.component';
import { AuthGuard } from './auth.guard';
import { NewItemComponent } from './screens/inventory/new-item/new-item.component';
import { DepartmentComponent } from './screens/inventory/department/department.component';
import { TreeViewComponent } from './screens/inventory/department/tree-view/tree-view.component';
import {VendorsTableComponent} from "./screens/vendors/vendors-table.component";
import {VendorsModule} from "./screens/vendors/vendors.module";
import { NavBarService } from 'app/screens/manager/navbar/navbar.service';
import { RetailScreenComponent } from './retail-screen/retail-screen.component';
import {AutoCompleteModule} from 'primeng/primeng';

const appRoutes: Routes = [
  { path: '', component: PincodeComponent, pathMatch: 'full' },
  { path: 'retail-screen', component: RetailScreenComponent},
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
  { path: 'screens/manager', component: ManagerComponent, canActivate: [AuthGuard] },
  { path: 'screens/order', component: OrderComponent, canActivate: [AuthGuard] },
  { path: 'screens/vendors', component: VendorsTableComponent, canActivate: [AuthGuard] },
  { path: 'inventory/new-item', component: NewItemComponent, canActivate: [AuthGuard] },
  { path: 'inventory/department', component: DepartmentComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    PincodeComponent,
    PaymentComponent,
    ManagerComponent,
    OrderComponent,
    NewItemComponent,
    DepartmentComponent,
    TreeViewComponent,
    RetailScreenComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    VendorsModule,
    AutoCompleteModule
    // ChartModule
  ],
  providers: [
    Api,
    AuthGuard,
    AuthService,
    NavBarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
