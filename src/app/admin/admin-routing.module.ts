import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AdminComponent} from './admin.component';
import {AngularTokenService} from 'angular-token';
import {LoginComponent} from './components/login/login.component';
import {ArticlesComponent} from './components/articles/articles.component';
import {ArticleComponent} from './components/article/article.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard'},
      { path: 'login', component: LoginComponent},
      { path: 'dashboard', component: DashboardComponent, canActivate: [AngularTokenService]},
      { path: 'articles', component: ArticlesComponent, canActivate: [AngularTokenService]},
      { path: 'article/:id', component: ArticleComponent, canActivate: [AngularTokenService]}
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
