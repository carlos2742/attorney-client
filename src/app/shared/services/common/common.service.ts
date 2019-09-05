import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {LocalizeRouterService} from '@gilsdav/ngx-translate-router';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private commonResource: string;

  constructor(private translate: TranslateService, private localize: LocalizeRouterService, private http: HttpClient) {
    this.commonResource = `${this.apiUrl}common/`;
  }

  public initializeLanguage() {
    this.localize.init();
    const currentLang = this.localize.parser.currentLang;
    return this.changeApiLanguage(currentLang);
  }

  public changeLanguage(language) {
    this.localize.changeLanguage(language);
    return this.changeApiLanguage(language);
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

  get apiUrl() {
    return environment.apiUrl;
  }

  private changeApiLanguage(lang) {
    const url = `${this.commonResource}language`;
    return this.http.post(url, {common: {lang}});
  }
}
