import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import {ngfModule} from 'angular-file';
import {UploadService} from './services/upload.service';
import { LoginComponent } from './components/login/login.component';
import {SharedModule} from '../shared/shared.module';
import { AdminInputComponent } from './helpers/form/admin-input/admin-input.component';
import { AdminNavbarComponent } from './layouts/admin-navbar/admin-navbar.component';
import {NgbDropdownModule, NgbModalModule, NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';
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
import {AdminNotificationComponent} from './helpers/admin-notification/admin-notification.component';
import { AdminSelectComponent } from './helpers/form/admin-select/admin-select.component';
import { AdminTextEditorComponent } from './helpers/form/admin-text-editor/admin-text-editor.component';
import { AdminMultiSelectComponent } from './helpers/form/admin-multi-select/admin-multi-select.component';
import { TagsComponent } from './components/tags/tags.component';
import {AuthenticationService} from './services/authentication/authentication.service';
import { UsersComponent } from './components/users/users.component';
import {GuardService} from './services/authentication/guard.service';
import {UserService} from './services/user/user.service';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ShowForRoleDirective } from './directives/show-for-role/show-for-role.directive';
import { ProfileComponent } from './components/profile/profile.component';
import {StoreModule} from '@ngrx/store';
import {reducer} from './store/reducers/admin.reducers';
import {EffectsModule} from '@ngrx/effects';
import {AdminEffects} from './store/effects/admin.effects';

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
    AdminErrorComponent,
    AdminNotificationComponent,
    AdminSelectComponent,
    AdminTextEditorComponent,
    AdminMultiSelectComponent,
    TagsComponent,
    UsersComponent,
    UnauthorizedComponent,
    NotFoundComponent,
    ShowForRoleDirective,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    ngfModule,
    NgbDropdownModule,
    NgbModalModule,
    NgbPopoverModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    StoreModule.forFeature('admin', reducer),
    EffectsModule.forFeature([AdminEffects]),
  ],
  providers: [
    UploadService,
    ArticleService,
    PracticeAreaService,
    TagService,
    AuthenticationService,
    GuardService,
    UserService
  ]
})
export class AdminModule { }
