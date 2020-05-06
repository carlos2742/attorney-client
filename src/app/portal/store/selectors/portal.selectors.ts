import {PortalState} from '../reducers/portal.reducers';
import {createFeatureSelector, createSelector} from '@ngrx/store';

const fromPortal = createFeatureSelector('portal');

export const selectedMenuItem = createSelector(fromPortal, (state: PortalState) => state.menuItem);
export const showSubHeader = createSelector(fromPortal, (state: PortalState) => state.showSubHeader);
export const selectFormState = createSelector(fromPortal, (state: PortalState) => state.form);

const fromArticle = createSelector(fromPortal, (state: PortalState) => state.article);
export const isArticleLoading = createSelector(fromArticle, (article) => article.loading);
export const selectArticle = createSelector(fromArticle, (article) => article.data);

const fromArticles = createSelector(fromPortal, (state: PortalState) => state.articles);
export const areArticlesLoading = createSelector(fromArticles, (articles) => articles.loading);
export const selectArticles = createSelector(fromArticles, (articles) => {
  return {total: articles.total, data: articles.data};
});
export const selectArticlesFilter = createSelector(fromArticles, (articles) =>{
  return articles.filter;
})

const fromComments = createSelector(fromArticle, (article) => article.comments);
export const areCommentsLoading = createSelector(fromComments, (comments) => comments.loading);
export const selectComments = createSelector(fromComments, (comments) => {
  return {total: comments.total, data: comments.data};
});


