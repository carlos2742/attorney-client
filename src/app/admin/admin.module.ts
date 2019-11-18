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
import {NgbButtonsModule, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import { AdminProfileComponent } from './layouts/admin-navbar/admin-profile/admin-profile.component';
import { AdminMenuComponent } from './layouts/admin-navbar/admin-menu/admin-menu.component';
import { ArticlesComponent } from './components/articles/articles.component';
import {ArticleService} from './services/article/article.service';
import { ArticleComponent } from './components/articles/article/article.component';
import { CreateArticleComponent } from './components/articles/create-article/create-article.component';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {PracticeAreaService} from './services/practice_area/practice-area.service';
import {TagService} from './services/tag/tag.service';
import { AdminErrorComponent } from './helpers/admin-error/admin-error.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AdminComponent,
    LoginComponent,
    AdminInputComponent,
    AdminNavbarComponent,
    AdminProfileComponent,
    AdminMenuComponent,
    ArticlesComponent,
    ArticleComponent,
    CreateArticleComponent,
    AdminErrorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    ngfModule,
    NgbDropdownModule,
    NgbButtonsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    UploadService,
    ArticleService,
    PracticeAreaService,
    TagService
  ]
})
export class AdminModule { }
