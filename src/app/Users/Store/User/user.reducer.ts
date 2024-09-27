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
  on(AuthActions.loginSuccess, (state, { user, Token }) => {
   
    return{
    ...state,
    user,
    Token,
    users: [],
    loading: false,
    error: null

   }
   
  }),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    user: null,
    users: [],
    token: null,
    loading: false,
    error
  })),
  on(AuthActions.loaduser,(state)=>{
    return {
      ...state,
      loading:true,
      error:null
    }
  }),
  on(AuthActions.loaduserSucess,(state,{user})=>{
    return {
      ...state,
      user,
      users: [],
      loading:false,
      error:null
    }
  }),
  on(AuthActions.loadUserFailure,(state,{error})=>{
    return {
      ...state,
      error,
      users: [],
      loading:false,
      user:null

    }
  })



)









