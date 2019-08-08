import { Component, OnInit } from '@angular/core';
import * as CommonActions from '../../../../../shared/store/actions/common.actions';
import {Store} from '@ngrx/store';
import {CommonState} from '../../../../../shared/store/reducers/common.reducers';
import * as CommonSelector from '../../../../../shared/store/selectors/common.selectors';
import {PortalState} from '../../../../store/reducers/portal.reducers';
import * as PortalSelector from '../../../../store/selectors/portal.selectors';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {

  private currentLang: string;
  private currentRoute: string;

  constructor(private commonStore: Store<CommonState>, private portalStore: Store<PortalState>) {
    this.commonStore.select(CommonSelector.selectCurrentLanguage).subscribe(language => {
      this.currentLang = language;
    });
    this.portalStore.select(PortalSelector.selectedRoute).subscribe(route => {
      this.currentRoute = route;
    });
  }

  ngOnInit() {
  }

  changeLanguage(lang) {
    if (lang !== this.currentLang) {
      const payload = {
        lang,
        route: {
          prefix: 'portal',
          url: this.currentRoute !== '' ? `PORTAL.ROUTES.${this.currentRoute}` : ''
        }
      };

      this.commonStore.dispatch(new CommonActions.ChangeLanguage(payload));
    }
  }

  get isSpanishSelected() {
    return this.currentLang === 'es';
  }

}
