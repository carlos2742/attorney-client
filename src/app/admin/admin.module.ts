import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ScaffoldComponent } from './components/scaffold/scaffold.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
  declarations: [ScaffoldComponent, DashboardComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
