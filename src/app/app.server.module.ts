import { NgModule } from '@angular/core';
import {ServerModule, ServerTransferStateModule} from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import {TranslateServerLoader} from './core/translate_loader/translate-server-loader';
import {TransferState} from '@angular/platform-browser';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {LazyUniversalModuleLoaderProvider} from 'localize-router-lazy-universal-module-loader';

export function translateFactory(transferState: TransferState) {
  return new TranslateServerLoader('/assets/i18n', '.json', transferState);
}

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    // ServerTransferStateModule,
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: translateFactory,
    //     deps: [TransferState]
    //   }
    // })
  ],
  providers: [
    // LazyUniversalModuleLoaderProvider
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
