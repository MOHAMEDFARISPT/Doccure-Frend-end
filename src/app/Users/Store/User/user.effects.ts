import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserServicesService } from '../../services/user-services.service';
import * as AuthActions from './user.actions';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { loginResponse } from '../../Interfaces/userInterface';
import * as userActions from '../../Store/User/user.actions' 
import { UserModel } from './userModel';

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
         if(response.success){
          this.toastr.success(response.message)
            console.log("effectData",response.data)
          return AuthActions.loginSuccess({user: response.data,Token: response.data.accessToken});
         }else{
          this.toastr.error(response.message)
          return AuthActions.loginFailure({error:response.message})          
         }      
          }),
          catchError(error => {
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
        localStorage.setItem('userId',action.user._id!)
        this.router.navigate(['/find-Doctors']).catch(err => {
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
       
        
      })
    ),
    { dispatch: false }
  );


 
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loaduser),
      switchMap(() => {
        const userId = localStorage.getItem('userId');
        return this.userService.loadUser(userId).pipe(
          tap((res: loginResponse) => {
          }),
          map((res: loginResponse) =>  userActions.loaduserSucess({user:res.data} )),
          catchError((error) => of(userActions.loadUserFailure({ error }))) 
        );
      })
    )
  );
  










}
