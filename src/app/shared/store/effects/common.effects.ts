import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import * as PortalActions from '../actions/common.actions';
import {CommonService} from '../../services/common/common.service';

@Injectable()
export class CommonEffects {

  constructor(private actions$: Actions, private common: CommonService) {}

  @Effect()
  InitializeLanguage$ = this.actions$
    .pipe(
      ofType(PortalActions.ActionTypes.InitializeLanguage),
      mergeMap(() => this.common.initializeLanguage()
        .pipe(
          map(lang => new PortalActions.InitializeLanguageSuccess(lang))
        )
      )
    );

  @Effect()
  ChangeLanguage$ = this.actions$
    .pipe(
      ofType(PortalActions.ActionTypes.ChangeLanguage),
      map((action: PortalActions.ChangeLanguage) => action.payload),
      switchMap(newLang => this.common.changeLanguage(newLang)
        .pipe(
          map(lang => new PortalActions.ChangeLanguageSuccess(lang))
        )
      )
    );
}
