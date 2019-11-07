import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AdminComponent} from './admin.component';
import {AngularTokenService} from 'angular-token';
import {LoginComponent} from './components/login/login.component';
import {LocalizeRouterModule} from '@gilsdav/ngx-translate-router';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard'},
      { path: 'login', component: LoginComponent},
      { path: 'dashboard', component: DashboardComponent, canActivate: [AngularTokenService]}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
