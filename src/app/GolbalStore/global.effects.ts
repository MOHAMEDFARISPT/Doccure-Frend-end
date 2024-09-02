import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
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
  // Effect to load users
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GlobalActions.loadUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map(users => GlobalActions.loadUsersSuccess({ users })),
          catchError(error => of(GlobalActions.loadUsersFailure({ error })))
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

 
}
