import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private translate: TranslateService) { }

  public initializeLanguage() {
    this.translate.addLangs(['en', 'es']);
    const browserLang = this.translate.getBrowserLang();
    const language = this.translate.getLangs().indexOf(browserLang) > -1 ? browserLang : 'en';
    this.translate.setDefaultLang(language);
    return new Observable( observe => {
      observe.next(language);
      observe.complete();
    });
  }

  public changeLanguage(language) {
    this.translate.use(language);
    return new Observable( observe => {
      observe.next(language);
      observe.complete();
    });
  }
}
