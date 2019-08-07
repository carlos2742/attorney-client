import {Action} from '@ngrx/store';

export enum ActionTypes {
  SelectMenu = '[Portal] Select Menu',
  SendEmail = '[Portal] Send Email',
  EmailSent = '[Portal] Email Sent',
  SendEmailFail = '[Portal] Send Email Fail'

}

export class SelectMenu implements Action {
  readonly type = ActionTypes.SelectMenu;
  constructor(public payload: any) {}
}

export class SendEmail implements Action {
  readonly type = ActionTypes.SendEmail;
  constructor(public payload: any) {}
}

export class SendEmailFail implements Action {
  readonly type = ActionTypes.SendEmailFail;
  constructor(public payload: any) {}
}

export class EmailSent implements Action {
  readonly type = ActionTypes.EmailSent;
}

export type ActionsUnion = SelectMenu |
  SendEmail |
  SendEmailFail |
  EmailSent;

