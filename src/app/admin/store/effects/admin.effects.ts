import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import * as AdminActions from '../actions/admin.actions';
import {of} from 'rxjs';
import {User} from '../../../models/admin.model';

@Injectable()
export class AdminEffects {
  constructor(private actions$: Actions, private auth: AuthenticationService) {}

  @Effect()
  loadLoggedUser$ = this.actions$
    .pipe(
      ofType(AdminActions.ActionTypes.LoadLoggedUser),
      switchMap((payload) => {
          return this.auth.loggedUser()
            .pipe(map((user: User) => {
                return new AdminActions.LoadLoggedUserSuccess(user);
              },
              catchError(error => of(new AdminActions.LoadLoggedUserFail(error)))
            ));
        }
      )
    );
}
