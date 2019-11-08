import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import {ngfModule} from 'angular-file';
import {UploadService} from './services/upload.service';
import { LoginComponent } from './components/login/login.component';
import {SharedModule} from '../shared/shared.module';
import { AdminInputComponent } from './helpers/admin-input/admin-input.component';
import { AdminNavbarComponent } from './layouts/admin-navbar/admin-navbar.component';
import {NgbDropdownItem, NgbDropdownMenu, NgbDropdownModule, NgbDropdownToggle} from '@ng-bootstrap/ng-bootstrap';
import { AdminProfileComponent } from './layouts/admin-navbar/admin-profile/admin-profile.component';
import { AdminMenuComponent } from './layouts/admin-navbar/admin-menu/admin-menu.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AdminComponent,
    LoginComponent,
    AdminInputComponent,
    AdminNavbarComponent,
    AdminProfileComponent,
    AdminMenuComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    ngfModule,
    NgbDropdownModule
  ],
  providers: [
    UploadService,
    NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle
  ]
})
export class AdminModule { }
