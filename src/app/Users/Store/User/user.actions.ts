import { createAction, props } from '@ngrx/store';
import { CreateUserDto } from '../../../shared/dtos/create-user.dto';
import { UserModel, user } from './userModel';
import { UserData } from '../../../shared/interfaces/Auth';










//login user
export const loginUser = createAction('[Auth] Login User', props<{ email: string; password: string }>());
export const loginSuccess = createAction('[Auth] Login Success',props<{ user: UserModel; Token: string }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());
