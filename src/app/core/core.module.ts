import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import {StoreModule} from '@ngrx/store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreRoutingModule,
    StoreModule.forRoot({})
  ],
  exports: [
    CoreRoutingModule,
    StoreModule
  ]
})
export class CoreModule { }
