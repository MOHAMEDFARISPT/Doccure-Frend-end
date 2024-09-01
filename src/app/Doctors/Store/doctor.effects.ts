// auth.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { DoctorServiceService } from '../services/doctor-service.service';
import * as DoctorActions from './doctor.action'
import { ToastrService } from 'ngx-toastr';
import { response } from 'express';
import { Router } from '@angular/router';

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
          map((response: any) => {
            if (response.success) {
              this.toastr.success(response.message);
              return DoctorActions.loginSuccess({ Doctor: response.Data, Token: response.Token });
            } else {
              this.toastr.error(response.message);
              return DoctorActions.loginFailure({ error: response.message });
            }
          }),
          catchError((error: any) => {
            // Extract the error message from the HttpErrorResponse
            const errorMessage = error.error?.message || 'Oops.. Something went wrong..';
            console.error('Login error occurred:', error); // Log the error for debugging
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
      tap((response: { Token: string }) => {
        localStorage.setItem('token', response.Token);
        this.router.navigate(['/Home']).catch(err => {
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

    }



  
  
  