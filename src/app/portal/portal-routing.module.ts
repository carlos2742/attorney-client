import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {PortalComponent} from './portal.component';
import {FrequentsAnswersQuestionsComponent} from './components/frequents-answers-questions/frequents-answers-questions.component';
import {LocalizeRouterModule} from '@gilsdav/ngx-translate-router';


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
