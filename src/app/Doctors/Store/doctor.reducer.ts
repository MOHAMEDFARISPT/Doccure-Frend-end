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
    on(DoctorActions.loginSuccess, (state, { Doctor,Token }) => ({
      ...state,
      Doctor,
      Token,
      loading: false,
      error: null,
    })),
    on(DoctorActions.loginFailure, (state, { error }) => ({
      ...state,
      loading: false,
      Doctor:null,
      Token:null,
      error,
    }))
  );