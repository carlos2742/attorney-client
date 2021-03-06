/// <reference types="node" />
import {Observable} from 'rxjs';
import {TranslateLoader} from '@ngx-translate/core';

declare var require: any;
import {makeStateKey, StateKey, TransferState} from '@angular/platform-browser';

const fs = require('fs');
const path = require('path');

export class TranslateServerLoader implements TranslateLoader {

  constructor(private prefix: string = 'i18n',
              private suffix: string = '.json',
              private transferState: TransferState) {
  }

  public getTranslation(lang: string): Observable<any> {

    return new Observable(observer => {
      const assetsFolder = path.join(process.cwd(), 'dist', 'browser', this.prefix);

      const jsonData = JSON.parse(fs.readFileSync(`${assetsFolder}/${lang}${this.suffix}`, 'utf8'));

      // Here we save the translations in the transfer-state
      const key: StateKey<number> = makeStateKey<number>('transfer-translate-' + lang);
      this.transferState.set(key, jsonData);

      observer.next(jsonData);
      observer.complete();
    });
  }
}
