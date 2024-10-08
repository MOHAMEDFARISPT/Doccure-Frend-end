import { createAction, props } from '@ngrx/store';
import { UserModel, user } from './userModel';










//login user
export const loginUser = createAction('[Auth] Login User', props<{ email: string; password: string }>());
export const loginSuccess = createAction('[Auth] Login Success',props<{ user: UserModel; Token: string }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());


export const loaduser=createAction('[loadUser] loadUser')
export const loaduserSucess=createAction('[loadUserSucess] loadUserSucess',props<{user:UserModel}>())
export const loadUserFailure=createAction('[loadFailure] loadUserFailure',props<{error:string}>())

