import {Action} from '@ngrx/store';

export enum ActionTypes {
  SelectMenu = '[Portal] Select Menu',
  SendEmail = '[Portal] Send Email',
  EmailSent = '[Portal] Email Sent',
  SendEmailFail = '[Portal] Send Email Fail',
  LoadArticle = '[Portal] Load Article',
  LoadArticleFail = '[Portal] Load Article Fail',
  LoadArticleSuccess = '[Portal] Load Article Success',
  LoadArticles = '[Portal] Load Articles',
  LoadArticlesFail = '[Portal] Load Articles Fail',
  LoadArticlesSuccess = '[Portal] Load Articles Success',
  LoadComments = '[Portal] Load Comments',
  LoadCommentsFail = '[Portal] Load Comments Fail',
  LoadCommentsSuccess = '[Portal] Load Comments Success',
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

export class LoadArticle implements Action {
  readonly type = ActionTypes.LoadArticle;
  constructor(public payload: any) {}
}

export class LoadArticleFail implements Action {
  readonly type = ActionTypes.LoadArticleFail;
  constructor(public payload: any) {}
}

export class LoadArticleSuccess implements Action {
  readonly type = ActionTypes.LoadArticleSuccess;
  constructor(public payload: any) {}
}

export class LoadArticles implements Action {
  readonly type = ActionTypes.LoadArticles;
  constructor(public payload: any) {}
}

export class LoadArticlesFail implements Action {
  readonly type = ActionTypes.LoadArticlesFail;
  constructor(public payload: any) {}
}

export class LoadArticlesSuccess implements Action {
  readonly type = ActionTypes.LoadArticlesSuccess;
  constructor(public payload: any) {}
}

export class LoadComments implements Action {
  readonly type = ActionTypes.LoadComments;
  constructor(public payload: any) {}
}

export class LoadCommentsFail implements Action {
  readonly type = ActionTypes.LoadCommentsFail;
  constructor(public payload: any) {}
}

export class LoadCommentsSuccess implements Action {
  readonly type = ActionTypes.LoadCommentsSuccess;
  constructor(public payload: any) {}
}

export type ActionsUnion = SelectMenu |
  SendEmail |
  SendEmailFail |
  EmailSent |
  LoadArticle |
  LoadArticleFail |
  LoadArticleSuccess |
  LoadArticles |
  LoadArticlesFail |
  LoadArticlesSuccess |
  LoadComments |
  LoadCommentsFail |
  LoadCommentsSuccess;

