import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserServicesService } from '../../services/user-services.service';
import * as AuthActions from './user.actions';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { loginResponse } from '../../Interfaces/userInterface';

@Injectable()
export class UserEffects {

  constructor(
    private userService: UserServicesService, 
    private actions$: Actions,
    private router:Router,
    private toastr:ToastrService
  ) {}


  





  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginUser),
      mergeMap(action =>
        this.userService.loginUser({ email: action.email, password: action.password }).pipe(
          map((response: loginResponse) => {
            alert(response.data.accessToken)
         if(response.success){
      
          this.toastr.success(response.message)
         
          return AuthActions.loginSuccess({user: response.data,Token: response.data.accessToken});
         }else{
          this.toastr.error(response.message)
          return AuthActions.loginFailure({error:response.message})          
         }      
          }),
          catchError(error => {
            this.toastr.error('please login with Google Account');
            return of(AuthActions.loginFailure({ error: error.message }));
          })
        )
      )
    )
  );
  


  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(action => {
        localStorage.setItem('token', action.Token);
        this.router.navigate(['/my-appointments']).catch(err => {
          console.error('Navigation error:', err);
        });
      })
    ),
    { dispatch: false }
  );
  


  loginFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginFailure),
      tap(action => {
        console.error('Login failed:', action.error);
        
      })
    ),
    { dispatch: false }
  );








}
