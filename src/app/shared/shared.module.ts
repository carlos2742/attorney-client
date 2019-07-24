import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {CommonService} from './services/common/common.service';
import {StoreModule} from '@ngrx/store';
import {reducer} from '../shared/store/reducers/common.reducers';
import {EffectsModule} from '@ngrx/effects';
import {CommonEffects} from './store/effects/common.effects';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    StoreModule.forFeature('common', reducer),
    EffectsModule.forFeature([CommonEffects])
  ],
  exports: [
    CommonModule,
    TranslateModule
  ],
  providers: [
    CommonService
  ]
})
export class SharedModule { }
