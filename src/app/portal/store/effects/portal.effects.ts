import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';

import * as PortalActions from '../actions/portal.actions';
import {CommonService} from '../../../shared/services/common/common.service';
import {of} from 'rxjs';
import {BlogService} from '../../../shared/services/blog/blog.service';
import {Article} from '../../../models/portal.model';
import { Store} from '@ngrx/store';
import {PortalState} from '../reducers/portal.reducers';

interface ArticleGroupResponse{
  groups: any;
  total: any;
}

@Injectable()
export class PortalEffects {

  constructor(private actions$: Actions, private common: CommonService, private portalStore: Store<PortalState>, private blog: BlogService) {}

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
      switchMap((payload) => {
          return this.blog.article(payload.permalink, payload.lang).pipe(
            map((article: Article) => {
                this.portalStore.dispatch(new PortalActions.LoadComments({articleId: article.id, page: 1}));
                return new PortalActions.LoadArticleSuccess(article);
              },
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
      switchMap((payload) => {
          return this.blog.articleList(payload.lang, payload.filter, payload.page)
            .pipe(
              map((response: ArticleGroupResponse) => {
                  return new PortalActions.LoadArticlesSuccess(response);
                },
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
