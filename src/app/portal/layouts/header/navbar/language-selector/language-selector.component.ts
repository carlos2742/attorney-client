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

  constructor(private commonStore: Store<CommonState>) {
    this.commonStore.select(CommonSelector.selectCurrentLanguage).subscribe(language => {
      this.currentLang = language;
    });
  }

  ngOnInit() {
  }

  changeLanguage(lang) {
    if (lang !== this.currentLang) {
      const payload = {
        lang
      };
      this.commonStore.dispatch(new CommonActions.ChangeLanguage(payload));
    }
  }

  get isSpanishSelected() {
    return this.currentLang === 'es';
  }

}
