import { createReducer, on } from '@ngrx/store';
import { initialState } from './user.state';
import * as AuthActions from './user.actions';
import { state } from '@angular/animations';

export const userreducer = createReducer(
  initialState,
  on(AuthActions.loginUser, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AuthActions.loginSuccess, (state, { user, Token }) => ({
    ...state,
    user,
    Token,
    users: [],
    loading: false,
    error: null
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    user: null,
    users: [],
    token: null,
    loading: false,
    error
  }))


)









