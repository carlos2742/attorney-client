import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {PortalComponent} from './portal.component';
import {FrequentsAnswersQuestionsComponent} from './components/frequents-answers-questions/frequents-answers-questions.component';
import {LocalizeRouterModule} from '@gilsdav/ngx-translate-router';
import {BlogComponent} from './components/blog/blog.component';
import {ArticleComponent} from './components/article/article.component';

const routes: Routes = [
  {
    path: '',
    component: PortalComponent,
    children: [
      { path: '', component: HomeComponent},
      { path: 'home', component: HomeComponent},
      { path: 'about', component: HomeComponent},
      { path: 'area_of_practices', component: HomeComponent},
      { path: 'faq', component: FrequentsAnswersQuestionsComponent},
      { path: 'article/:permalink', component: ArticleComponent},
      { path: 'blog', component: BlogComponent},
      { path: 'blog/:page', component: BlogComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    LocalizeRouterModule.forChild(routes)
  ],
  exports: [RouterModule, LocalizeRouterModule]
})
export class PortalRoutingModule { }
