import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ScaffoldComponent} from './components/scaffold/scaffold.component';
import {HomeComponent} from './components/home/home.component';


const routes: Routes = [
  {
    path: '',
    component: ScaffoldComponent,
    children: [
      { path: '', component: HomeComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
