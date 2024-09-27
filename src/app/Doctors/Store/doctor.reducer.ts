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
    })),

    on(DoctorActions.loadDoctor,(state)=>{
      return {
        ...state,
        loading:true,
        error:null

      }
    }),
    on(DoctorActions.loadDoctorSuccess,(state,{Doctor})=>{
      return {
        ...state,
        Doctor,
        loading:false,
        error:null
      }
    }),
    on(DoctorActions.loadDoctorFailure,(state,{error})=>{
      return {
        ...state,
        Doctor:null,
        loading:false,
        error
      }
    })
  );