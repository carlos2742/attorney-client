import {Action} from '@ngrx/store';

export enum ActionTypes {
  SelectMenu = '[Common] Select Menu'
}

export class SelectMenu implements Action {
  readonly type = ActionTypes.SelectMenu;
  constructor(public payload: any) {}
}

export type ActionsUnion = SelectMenu;

