import {Action} from '@ngrx/store';

export enum ActionTypes {
  InitLanguage = '[Language] Init',
  ChangeLanguage = '[Language] Change'
}

export class InitLanguage implements Action {
  readonly type = ActionTypes.InitLanguage;
  constructor() {}
}

export class ChangeLanguage implements Action {
  readonly type = ActionTypes.ChangeLanguage;
  constructor(public payload: any) {}
}

export type ActionsUnion = InitLanguage |
  ChangeLanguage;
