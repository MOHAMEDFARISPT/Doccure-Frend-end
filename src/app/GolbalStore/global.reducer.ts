
// global.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { globalState, initialState } from './global.state';
import { loadUsers, loadUsersSuccess, loadUsersFailure, loadDoctors, loadDoctorsSuccess, loadDoctorsFailure } from './global.action';

export const globalReducer = createReducer(
  initialState,
  
  // User actions
  on(loadUsers, (state) => ({ ...state, loading: true })),
  on(loadUsersSuccess, (state, { users }) => ({ ...state, users, loading: false })),
  on(loadUsersFailure, (state, { error }) => ({ ...state, error, loading: false })),
  
  // Doctor actions
  on(loadDoctors, (state) => ({ ...state, loading: true })),
  on(loadDoctorsSuccess, (state, { doctors }) => ({ ...state, doctors, loading: false })),
  on(loadDoctorsFailure, (state, { error }) => ({ ...state, error, loading: false })),
);
