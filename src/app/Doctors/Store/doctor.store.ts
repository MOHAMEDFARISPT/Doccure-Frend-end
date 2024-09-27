import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './doctor.state'


export const selectAuthState = createFeatureSelector<AuthState>('Doctor');


export const selectDoctor = createSelector(
  selectAuthState,
  (state: AuthState) => state.Doctor
);


export const selectLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.loading
);


export const selectError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);


