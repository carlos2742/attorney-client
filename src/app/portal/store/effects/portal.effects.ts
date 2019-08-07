import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import * as PortalActions from '../actions/portal.actions';
import {CommonService} from '../../../shared/services/common/common.service';
import {of} from 'rxjs';

@Injectable()
export class PortalEffects {

  constructor(private actions$: Actions, private common: CommonService) {}

  @Effect()
  SendEmail$ = this.actions$
    .pipe(
      ofType(PortalActions.ActionTypes.SendEmail),
      map((action: PortalActions.SendEmail) => action.payload),
      switchMap((emailData) => {
        return this.common.sendEmail(emailData)
          .pipe(
            map(() => new PortalActions.EmailSent(),
              catchError(error => of(new PortalActions.SendEmailFail(error)))
            )
          );
      }));
}
