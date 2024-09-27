

// auth.actions.ts
import { createAction, props } from '@ngrx/store';
import { doctorDetails } from '../../Admin/interfaces/interface';

export const loginRequest = createAction('[Doctor] Login',props<{ email: string; password: string }>());
export const loginSuccess = createAction('[Doctor] Login Success',props<{ Doctor: doctorDetails, token: string }>());
export const loginFailure = createAction('[Doctor] Login Failure',props<{ error: string }>() );


export const loadDoctor=createAction('[loadDoctor] loadDoctor');

export const loadDoctorSuccess=createAction('[loadDoctorSuccess] loadDoctorSuccess',props<{Doctor:doctorDetails}>())
export const loadDoctorFailure=createAction('[loadDoctorFailure] loadDoctorFailure',props<{error:string}>())
