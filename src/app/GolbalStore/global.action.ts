// global.actions.ts
import { createAction, props } from '@ngrx/store';
import { User, Doctor } from './global.model';
import { Appointment } from '../Users/Interfaces/userInterface';

export const loadUsers = createAction('[Global] Load Users');
export const loadUsersSuccess = createAction('[Global] Load Users Success', props<{ users: User[] }>());
export const loadUsersFailure = createAction('[Global] Load Users Failure', props<{ error: string }>());

export const loadDoctors = createAction('[Global] Load Doctors');
export const loadDoctorsSuccess = createAction('[Global] Load Doctors Success', props<{ doctors: Doctor[] }>());
export const loadDoctorsFailure = createAction('[Global] Load Doctors Failure', props<{ error: string }>());

export const loadAppointments=createAction('[Global] loadAppointments')
export const loadAppointmentsSuccess=createAction('[Global] loadAppointments Success',props<{Appointments:Appointment[]}>())
export const loadAppointmentsFailure=createAction('[Global] loadAppointments Failure',props<{error:string}>())

