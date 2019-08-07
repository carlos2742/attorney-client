import {PortalState} from '../reducers/portal.reducers';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export const fromPortal = createFeatureSelector('portal');

export const selectedMenu = createSelector(fromPortal, (state: PortalState) => state.menu.selected);
export const isFormSent = createSelector(fromPortal, (state: PortalState) => state.form.sent);


