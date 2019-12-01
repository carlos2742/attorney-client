import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AdminComponent, ROLES} from './admin.component';
import {AngularTokenService} from 'angular-token';
import {LoginComponent} from './components/login/login.component';
import {ArticlesComponent} from './components/articles/articles.component';
import {ArticleComponent} from './components/articles/article/article.component';
import {CreateArticleComponent} from './components/articles/create-article/create-article.component';
import {TagsComponent} from './components/tags/tags.component';
import {UsersComponent} from './components/users/users.component';
import {GuardService} from './services/authentication/guard.service';
import {UnauthorizedComponent} from './components/unauthorized/unauthorized.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {ProfileComponent} from './components/profile/profile.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard'},
      { path: 'login', component: LoginComponent},
      { path: 'dashboard', component: DashboardComponent, canActivate: [GuardService]},
      { path: 'articles', component: ArticlesComponent, canActivate: [GuardService]},
      { path: 'article-view/:id', component: ArticleComponent, canActivate: [GuardService]},
      { path: 'create-article', component: CreateArticleComponent, canActivate: [GuardService]},
      { path: 'profile', component: ProfileComponent, canActivate: [GuardService]},
      { path: 'users', component: UsersComponent, canActivate: [GuardService], data: { roles: [ROLES.OWNER, ROLES.DEVELOPER]}},
      { path: 'tags', component: TagsComponent, canActivate: [GuardService]},
      { path: '401', component: UnauthorizedComponent, canActivate: [GuardService]},
      { path: '404', component: NotFoundComponent, canActivate: [GuardService]},
      { path: '**', redirectTo: '404'}
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
