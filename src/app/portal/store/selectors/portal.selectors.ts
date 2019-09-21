import {PortalState} from '../reducers/portal.reducers';
import {createFeatureSelector, createSelector} from '@ngrx/store';

const fromPortal = createFeatureSelector('portal');

export const selectedMenuItem = createSelector(fromPortal, (state: PortalState) => state.menuItem);
export const showSubHeader = createSelector(fromPortal, (state: PortalState) => state.showSubHeader);
export const selectFormState = createSelector(fromPortal, (state: PortalState) => state.form);

export const selectArticle = createSelector(fromPortal, (state: PortalState) => state.article);

const fromComments = createSelector(selectArticle, (article) => article.comments);
export const isCommentsLoading = createSelector(fromComments, (comments) => comments.loading);
export const selectComments = createSelector(fromComments, (comments) => {
  return {total: comments.total, data: comments.data};
});


