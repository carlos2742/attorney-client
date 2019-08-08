import {PortalState} from '../reducers/portal.reducers';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export const fromPortal = createFeatureSelector('portal');

export const selectedItem = createSelector(fromPortal, (state: PortalState) => state.menu.item);
export const selectedRoute = createSelector(fromPortal, (state: PortalState) => state.menu.route);
export const selectFormState = createSelector(fromPortal, (state: PortalState) => state.form);


