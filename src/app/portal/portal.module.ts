import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalRoutingModule } from './portal-routing.module';
import { HomeComponent } from './components/home/home.component';
import {SharedModule} from '../shared/shared.module';
import { PortalComponent } from './portal.component';


@NgModule({
  declarations: [
    HomeComponent,
    PortalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PortalRoutingModule
  ]
})
export class PortalModule { }
