import {Action} from '@ngrx/store';

export enum ActionTypes {
  LoadLoggedUser = '[Admin] Load Logged User',
  LoadLoggedUserFail = '[Admin] Load Logged User Fail',
  LoadLoggedUserSuccess = '[Admin] Load Logged User Success',
}

export class LoadLoggedUser implements Action {
  readonly type = ActionTypes.LoadLoggedUser;
  constructor() {}
}

export class LoadLoggedUserFail implements Action {
  readonly type = ActionTypes.LoadLoggedUserFail;
  constructor(public payload: any) {}
}

export class LoadLoggedUserSuccess implements Action {
  readonly type = ActionTypes.LoadLoggedUserSuccess;
  constructor(public payload: any) {}
}

export type ActionsUnion =
  LoadLoggedUser |
  LoadLoggedUserFail |
  LoadLoggedUserSuccess;
