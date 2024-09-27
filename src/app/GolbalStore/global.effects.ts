import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { UserServicesService } from '../Users/services/user-services.service';
import { DoctorServiceService } from '../Doctors/services/doctor-service.service'
import * as GlobalActions from './global.action';

@Injectable()
export class GlobalEffects {
    constructor(
        private actions$: Actions,
        private userService: UserServicesService,
        private doctorService: DoctorServiceService
      ) {}
      loadUsers$ = createEffect(() =>
        this.actions$.pipe(
          ofType(GlobalActions.loadUsers),
          mergeMap(() =>
            this.userService.getUsers().pipe(
              // Log data when received
              map(users => {
                console.log('Data received from backend:', users);
                return GlobalActions.loadUsersSuccess({ users });
              }),
              catchError(error => {
                console.error('Error occurred while fetching users:', error);
                return of(GlobalActions.loadUsersFailure({ error }));
              })
            )
          )
        )
      );
    

  // Effect to load doctors
  loadDoctors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GlobalActions.loadDoctors),
      mergeMap(() =>
        this.doctorService.getDoctors().pipe(
          map(doctors => GlobalActions.loadDoctorsSuccess({ doctors })),
          catchError(error => of(GlobalActions.loadDoctorsFailure({ error })))
        )
      )
    )
  );



  loadAppointments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GlobalActions.loadAppointments),
      switchMap(() =>
        this.doctorService.getAllAppointments().pipe(
          map(appointments => GlobalActions.loadAppointmentsSuccess({ Appointments: appointments })),  // Bind the response from the service to `Appointments`
          catchError(error => of(GlobalActions.loadAppointmentsFailure({ error })))
        )
      )
    )
  );
  

 
}
