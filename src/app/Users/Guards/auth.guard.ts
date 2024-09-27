// auth.guard.ts
import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, RouterStateSnapshot, Router, GuardResult, MaybeAsync } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import * as jwt_decode from 'jwt-decode';

interface DecodedToken {
  userId: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private router:Router, private notificationToastr: ToastrService) {}
  

  
    canActivate(): boolean {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken: DecodedToken = jwt_decode.jwtDecode(token) as DecodedToken;
  
          const currentTime = Math.floor(Date.now() / 1000);
         
             
          
          

          if (decodedToken.exp < currentTime) {
            // Token has expired
            this.notificationToastr.warning('please login again');
            this.router.navigate(['/User-login']);
            return false;
          }

          if(decodedToken.role!=='user'){
            this.notificationToastr.warning('You do not have permission to access this page');
            this.router.navigate(['/User-login'])
            

          }
  

        
          return true;
        } catch (error) {
          // Handle decoding error
          console.error('Error decoding token:', error);
          this.notificationToastr.warning('Invalid token, please login again');
          this.router.navigate(['/User-login']);
          return false;
        }
      } else {
        // No token found
        this.notificationToastr.warning('Please login to access this page');
        this.router.navigate(['/User-login']);
        return false;
      }
    }
  }
 

