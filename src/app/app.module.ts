import {BrowserModule, TransferState} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CoreModule} from './core/core.module';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import {TransferHttpCacheModule} from '@nguniversal/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateBrowserLoader} from './core/translate_loader/translate-browser-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {environment} from '../environments/environment';

// export function TranslateStaticLoader(http: HttpClient, transferState: TransferState) {
//   return new TranslateBrowserLoader('/assets/i18n/', '.json', transferState, http);
// }

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    TransferHttpCacheModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient, TransferState]
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
