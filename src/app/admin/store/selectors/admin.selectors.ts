import {AdminState} from '../reducers/admin.reducers';
import {createFeatureSelector, createSelector} from '@ngrx/store';

const fromAdmin = createFeatureSelector('admin');

export const selectLoggedUserInfo = createSelector(fromAdmin, (state: AdminState) => state.loggedUser);
export const isLoggedUserLoaded = createSelector(selectLoggedUserInfo, (info) => info.loaded);
export const selectLoggedUser = createSelector(selectLoggedUserInfo, (info) => info.data);

