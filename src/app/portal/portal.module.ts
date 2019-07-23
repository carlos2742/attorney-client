import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalRoutingModule } from './portal-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ScaffoldComponent } from './components/scaffold/scaffold.component';


@NgModule({
  declarations: [
    HomeComponent,
    ScaffoldComponent
  ],
  imports: [
    CommonModule,
    PortalRoutingModule
  ]
})
export class PortalModule { }
