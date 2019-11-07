import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import {ngfModule} from 'angular-file';
import {UploadService} from './services/upload.service';
import { LoginComponent } from './components/login/login.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [DashboardComponent, AdminComponent, LoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    ngfModule
  ],
  providers: [
    UploadService
  ]
})
export class AdminModule { }
