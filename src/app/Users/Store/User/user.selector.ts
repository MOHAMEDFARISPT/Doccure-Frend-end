import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './user.state';
import { UserModel, user } from './userModel';
// Feature selector for the user state
export const selectUserState = createFeatureSelector<AppState>('user'); // Adjust the feature key if it's different

// Selector to get the loading state
export const selectLoading = createSelector(
  selectUserState,
  (state: AppState) => state.loading,
);

// Selector to get the `user` slice from the state
export const selectUser = createSelector(
    (state: AppState) => state.user, // Ensure `user` is a part of `AppState`
    (user: UserModel | null) => user
  );