import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {PortalComponent} from './portal.component';
import {FrequentsAnswersQuestionsComponent} from './components/frequents-answers-questions/frequents-answers-questions.component';


const routes: Routes = [
  {
    path: '',
    component: PortalComponent,
    children: [
      { path: '', component: HomeComponent},
      { path: 'home', component: HomeComponent},
      { path: 'about', component: HomeComponent},
      { path: 'practices', component: HomeComponent},
      { path: 'frequents-answers', component: FrequentsAnswersQuestionsComponent},
      { path: 'inicio', component: HomeComponent},
      { path: 'preguntas-frecuentes', component: FrequentsAnswersQuestionsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
