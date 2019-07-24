import {Action} from '@ngrx/store';

export enum ActionTypes {
  InitializeLanguage = '[Language] Initialize',
  InitializedLanguage = '[Language] Initialized',
  ChangeLanguage = '[Language] Change',
  ChangeLanguageSuccess = '[Language] Change Success'
}

export class InitializeLanguage implements Action {
  readonly type = ActionTypes.InitializeLanguage;
  constructor() {}
}

export class InitializedLanguage implements Action {
  readonly type = ActionTypes.InitializedLanguage;
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
  InitializedLanguage |
  ChangeLanguage |
  ChangeLanguageSuccess;
