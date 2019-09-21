import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import * as PortalActions from '../actions/portal.actions';
import {CommonService} from '../../../shared/services/common/common.service';
import {of} from 'rxjs';
import {BlogService} from '../../../shared/services/blog/blog.service';

@Injectable()
export class PortalEffects {

  constructor(private actions$: Actions, private common: CommonService, private blog: BlogService) {}

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

  @Effect()
  loadArticle$ = this.actions$
    .pipe(
      ofType(PortalActions.ActionTypes.LoadArticle),
      map((action: PortalActions.LoadArticle) => action.payload),
      switchMap((permalink, lang) => {
          return this.blog.article(permalink, lang)
            .pipe(
              map(article => new PortalActions.LoadArticle(article),
                catchError(error => of(new PortalActions.LoadArticleFail(error)))
              ));
        }
      )
    );

  @Effect()
  loadArticles$ = this.actions$
    .pipe(
      ofType(PortalActions.ActionTypes.LoadArticles),
      map((action: PortalActions.LoadArticles) => action.payload),
      switchMap((lang, filter) => {
          return this.blog.articleList(lang, filter)
            .pipe(
              map(response => new PortalActions.LoadArticlesSuccess(response),
                catchError(error => of(new PortalActions.LoadArticlesFail(error)))
              ));
        }
      )
    );

  @Effect()
  loadComments$ = this.actions$
    .pipe(
      ofType(PortalActions.ActionTypes.LoadComments),
      map((action: PortalActions.LoadComments) => action.payload),
      switchMap((payload) => {
          return this.blog.commentsList(payload.articleId, payload.page)
            .pipe(
              map(response => new PortalActions.LoadCommentsSuccess(response),
                catchError(error => of(new PortalActions.LoadCommentsFail(error)))
              ));
        }
      )
    );
}
