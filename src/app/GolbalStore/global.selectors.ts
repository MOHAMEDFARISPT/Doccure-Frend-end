// global.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { globalState } from './global.state';

export const selectGlobalState = createFeatureSelector<globalState>('global');

export const selectAllUsers = createSelector(selectGlobalState, (state) => state.users);
export const selectAllDoctors = createSelector(selectGlobalState, (state) => state.doctors);
export const selectLoading = createSelector(selectGlobalState, (state) => state.loading);
export const selectError = createSelector(selectGlobalState, (state) => state.error);
