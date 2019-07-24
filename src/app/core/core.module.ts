import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
  ],
  exports: [
    CoreRoutingModule,
    StoreModule
  ]
})
export class CoreModule { }
