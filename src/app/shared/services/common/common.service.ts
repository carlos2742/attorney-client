import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private translate: TranslateService, private http: HttpClient) { }

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

  public sendEmail(data) {
    const body = {
      service_id: 'gmail',
      template_id: 'attorney',
      user_id: 'user_ewIBpXK83z3A4IDwIdIwM',
      template_params: data
    };
    const url = 'https://api.emailjs.com/api/v1.0/email/send';
    const header = new HttpHeaders();
    header.append('Authorization', 'ab5c9eef004343e07636ddcaa1630aa9');
    return this.http.post(url, body, {headers: header});
  }
}
