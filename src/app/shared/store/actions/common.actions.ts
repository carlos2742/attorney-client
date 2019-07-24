import {Action} from '@ngrx/store';

export enum ActionTypes {
  InitializeLanguage = '[Language] Initialize',
  InitializeLanguageSuccess = '[Language] Initialize Success',
  ChangeLanguage = '[Language] Change',
  ChangeLanguageSuccess = '[Language] Change Success'
}

export class InitializeLanguage implements Action {
  readonly type = ActionTypes.InitializeLanguage;
  constructor() {}
}

export class InitializeLanguageSuccess implements Action {
  readonly type = ActionTypes.InitializeLanguageSuccess;
  constructor(public payload: any) {}
}

export class ChangeLanguage implements Action {
  readonly type = ActionTypes.ChangeLanguage;
  constructor(public payload: any) {}
}

export class ChangeLanguageSuccess implements Action {
  readonly type = ActionTypes.ChangeLanguageSuccess;
  constructor(public payload: any) {}
}

export type ActionsUnion = InitializeLanguage |
  InitializeLanguageSuccess |
  ChangeLanguage |
  ChangeLanguageSuccess;
