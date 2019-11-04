import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import * as CommonActions from '../actions/common.actions';
import {CommonService} from '../../services/common/common.service';

@Injectable()
export class CommonEffects {

  constructor(private actions$: Actions, private common: CommonService) {}

  @Effect()
  InitializeLanguage$ = this.actions$
    .pipe(
      ofType(CommonActions.ActionTypes.InitializeLanguage),
      mergeMap(() => this.common.initializeLanguage()
        .pipe(
          map(lang => new CommonActions.InitializeLanguageSuccess(lang))
        )
      )
    );

  @Effect()
  ChangeLanguage$ = this.actions$
    .pipe(
      ofType(CommonActions.ActionTypes.ChangeLanguage),
      map((action: CommonActions.ChangeLanguage) => action.payload),
      switchMap(payload => this.common.changeLanguage(payload.lang)
        .pipe(
          map(lang => new CommonActions.ChangeLanguageSuccess(lang))
        )
      )
    );
}
