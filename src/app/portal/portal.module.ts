import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalRoutingModule } from './portal-routing.module';
import { HomeComponent } from './components/home/home.component';
import {SharedModule} from '../shared/shared.module';
import { PortalComponent } from './portal.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {reducer} from './store/reducers/portal.reducers';
import {PortalEffects} from './store/effects/portal.effects';


@NgModule({
  declarations: [
    HomeComponent,
    PortalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PortalRoutingModule,
    StoreModule.forFeature('portal', reducer),
    EffectsModule.forFeature([PortalEffects])
  ]
})
export class PortalModule { }
