import {PortalState} from '../reducers/portal.reducers';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export const fromPortal = createFeatureSelector('portal');

export const selectedMenuItem = createSelector(fromPortal, (state: PortalState) => state.menuItem);
export const showSubHeader = createSelector(fromPortal, (state: PortalState) => state.showSubHeader);
export const selectFormState = createSelector(fromPortal, (state: PortalState) => state.form);


