import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {LocalizeRouterService} from '@gilsdav/ngx-translate-router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private translate: TranslateService, private localize: LocalizeRouterService, private http: HttpClient) { }

  public initializeLanguage() {
    this.localize.init();
    return new Observable( observe => {
      observe.next(this.localize.parser.currentLang);
      observe.complete();
    });
  }

  public changeLanguage(language, route = {prefix: '', url: ''}) {
    this.localize.changeLanguage(language);
    return new Observable( observe => {
      observe.next(language);
      observe.complete();
    });
  }

  public sendEmail(data) {
    const body = {
      service_id: 'gmail',
      template_id: 'attorney',
      user_id: 'user_OTYF8oiRbLB7AjT8kr7KQ',
      template_params: data
    };
    const url = 'https://api.emailjs.com/api/v1.0/email/send';
    return this.http.post(url, body, { responseType: 'text' as 'json' });
  }
}
