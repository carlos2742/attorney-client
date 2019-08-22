import { NgModule } from '@angular/core';
import {CommonModule, isPlatformServer} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {CommonService} from './services/common/common.service';
import {StoreModule} from '@ngrx/store';
import {reducer} from '../shared/store/reducers/common.reducers';
import {EffectsModule} from '@ngrx/effects';
import {CommonEffects} from './store/effects/common.effects';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TransferState} from '@angular/platform-browser';
import {TranslateBrowserLoader} from '../core/translate_loader/translate-browser-loader';

export function TranslateStaticLoader(http: HttpClient, transferState: TransferState) {
  return new TranslateBrowserLoader('/assets/i18n/', '.json', transferState, http);
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateStaticLoader,
        deps: [HttpClient, TransferState]
      }
    }),
    StoreModule.forFeature('common', reducer),
    EffectsModule.forFeature([CommonEffects]),
    NgbModule
  ],
  exports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    CommonService
  ]
})
export class SharedModule { }
