import {CommonState} from '../reducers/common.reducers';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export const fromPortal = createFeatureSelector('common');

export const selectCurrentLanguage = createSelector(fromPortal, (state: CommonState) => state.language.currentLanguage);


