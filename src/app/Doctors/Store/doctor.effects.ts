// auth.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { DoctorServiceService } from '../services/doctor-service.service';
import * as DoctorActions from './doctor.action'
import { ToastrService } from 'ngx-toastr';
import { response } from 'express';
import { Router } from '@angular/router';
import { loginDoctorResponse } from '../Doctors-Interfaces/DoctorInterface';
import { doctorDetails } from '../../Admin/interfaces/interface';
import { User } from 'firebase/auth';
import { UserData } from '../../Users/Interfaces/userInterface';

@Injectable()
export class DoctorEffects {
  constructor(
    private actions$: Actions,
    private DoctorService: DoctorServiceService,
    private toastr:ToastrService,
    private router:Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DoctorActions.loginRequest),
      mergeMap((action) =>
        this.DoctorService.loginDoctor({ email: action.email, password: action.password }).pipe(
          map((response:any) => {
            if (response.success) {
              
              this.toastr.success(response.message);
              localStorage.setItem('DoctorId',response.data._id)
              return DoctorActions.loginSuccess({ Doctor: response.data, token: response.token });
            } else {
              this.toastr.error(response.message);
              return DoctorActions.loginFailure({ error: response.message });
            }
          }),
          catchError((error: any) => {
            // Extract the error message from the HttpErrorResponse
            const errorMessage = error.error?.message || 'Oops.. Something went wrong..';
            this.toastr.error(errorMessage); // Show the error message to the user
            return of(DoctorActions.loginFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DoctorActions.loginSuccess),
      tap((response: { token: string}) => {
   
        localStorage.setItem('token', response.token);
        this.router.navigate(['/Doctor-Dashboard']).catch(err => {
          console.error('Navigation error:', err);
        });
      })
    ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DoctorActions.loginFailure),
      tap(({ error }) => {
        console.log("error///",error)
        this.toastr.error(error, 'Login Failed'); 
      })
    ),
    { dispatch: false }
  );

  loadDoctor$ = createEffect(() =>
    this.actions$.pipe(
      // Filter actions to listen only for 'loadDoctor' action
      ofType(DoctorActions.loadDoctor),
      
      
      switchMap(() => {
        // Get the DoctorId from localStorage
        const DoctorId = localStorage.getItem('DoctorId');
   
        // Make the HTTP request using the DoctorId
        return this.DoctorService.loadDoctor(DoctorId).pipe(
          // If successful, dispatch 'loadDoctorSuccess' with the doctor data
          map((doctor: any) => DoctorActions.loadDoctorSuccess({ Doctor: doctor.data })),
          
          // If an error occurs, dispatch 'loadDoctorFailure' with the error message
          catchError((error) => of(DoctorActions.loadDoctorFailure({ error: error.message })))
        );
      })
    )
  );
  
  
  

    }



  
  
  