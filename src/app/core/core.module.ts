import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {ngfModule} from 'angular-file';
import {AngularTokenModule} from 'angular-token';
import {environment} from '../../environments/environment';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    AngularTokenModule.forRoot({
      apiBase: environment.apiUrl,
      signInRedirect: 'admin/login',
      signInStoredUrlStorageKey: 'redirectTo',
    })
  ],
  exports: [
    CoreRoutingModule,
    StoreModule,
    AngularTokenModule
  ]
})
export class CoreModule { }
