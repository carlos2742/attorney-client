import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalRoutingModule } from './portal-routing.module';
import { HomeComponent } from './components/home/home.component';
import {SharedModule} from '../shared/shared.module';
import { PortalComponent } from './portal.component';
import { HeaderComponent } from './layouts/header/header.component';
import { NavbarComponent } from './layouts/header/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { InfoComponent } from './layouts/footer/info/info.component';
import { FormComponent } from './layouts/form/form.component';
import { SocialNetworkComponent } from './layouts/social-network/social-network.component';
import { SubHeaderComponent } from './layouts/header/sub-header/sub-header.component';
import { TitleComponent } from './helpers/title/title.component';


@NgModule({
  declarations: [
    HomeComponent,
    PortalComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    InfoComponent,
    FormComponent,
    SocialNetworkComponent,
    SubHeaderComponent,
    TitleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PortalRoutingModule
  ]
})
export class PortalModule { }
