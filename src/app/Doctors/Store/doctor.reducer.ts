import { createReducer, on } from "@ngrx/store";
import { initialState } from "./doctor.state";
import * as  DoctorActions from './doctor.action';

export const DoctorReducer = createReducer(
    initialState,
    on(DoctorActions.loginRequest, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(DoctorActions.loginSuccess, (state, { Doctor, token }) => {
      localStorage.setItem('Doctor', JSON.stringify(Doctor));
      localStorage.setItem('token', token);
    
      return {
        ...state,
        Doctor,
        token,
        loading: false,
        error: null,
      };
    }),
    on(DoctorActions.loginFailure, (state, { error }) => ({
      ...state,
      loading: false,
      Doctor:null,
      token:null,
      error,
    }))
  );