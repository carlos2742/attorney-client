import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {CommonService} from './services/common/common.service';
import {StoreModule} from '@ngrx/store';
import {reducer} from '../shared/store/reducers/common.reducers';
import {EffectsModule} from '@ngrx/effects';
import {CommonEffects} from './store/effects/common.effects';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LocalizeRouterModule} from '@gilsdav/ngx-translate-router';
import {BlogService} from './services/blog/blog.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature('common', reducer),
    EffectsModule.forFeature([CommonEffects]),
    NgbModule
  ],
  exports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    NgbModule,
    LocalizeRouterModule
  ],
  providers: [
    CommonService,
    BlogService
  ]
})
export class SharedModule { }
