

// auth.actions.ts
import { createAction, props } from '@ngrx/store';

export const loginRequest = createAction('[Doctor] Login',props<{ email: string; password: string }>());
export const loginSuccess = createAction('[Doctor] Login Success',props<{ Doctor: any, Token: string }>());
export const loginFailure = createAction('[Doctor] Login Failure',props<{ error: string }>() );
