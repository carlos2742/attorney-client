import {State} from '../reducers/portal.reducers';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export const fromPortal = createFeatureSelector('portal');

export const selectedMenu = createSelector(fromPortal, (state: State) => state.menu.selected);
export const isFormSent = createSelector(fromPortal, (state: State) => state.form.sent);


