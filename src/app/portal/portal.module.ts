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
import { InputComponent } from './helpers/input/input.component';
import { FrequentsAnswersQuestionsComponent } from './components/frequents-answers-questions/frequents-answers-questions.component';
import {StoreModule} from '@ngrx/store';
import {reducer} from './store/reducers/portal.reducers';
import {EffectsModule} from '@ngrx/effects';
import {PortalEffects} from './store/effects/portal.effects';
import { LanguageSelectorComponent } from './layouts/header/navbar/language-selector/language-selector.component';
import {TranslateModule} from '@ngx-translate/core';


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
    TitleComponent,
    InputComponent,
    FrequentsAnswersQuestionsComponent,
    LanguageSelectorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PortalRoutingModule,
    StoreModule.forFeature('portal', reducer),
    EffectsModule.forFeature([PortalEffects]),
    TranslateModule.forChild()
  ]
})
export class PortalModule { }
