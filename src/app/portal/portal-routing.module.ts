import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {PortalComponent} from './portal.component';


const routes: Routes = [
  {
    path: '',
    component: PortalComponent,
    children: [
      { path: '', component: HomeComponent},
      { path: 'home', component: HomeComponent},
      { path: 'inicio', component: HomeComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
