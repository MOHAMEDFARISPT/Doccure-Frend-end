
import { Injectable, NgZone } from '@angular/core';
import { getAuth, Auth, GoogleAuthProvider } from 'firebase/auth';
import { signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirebaseApp } from '@angular/fire/app';
import { UserServicesService } from '../Users/services/user-services.service'
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})



export class GoogleAuthService {

  private auth: Auth;

  constructor(private toaster:ToastrService,private router: Router, private firebaseApp: FirebaseApp, private userService: UserServicesService, private ngZone: NgZone) {
    this.auth = getAuth(firebaseApp)
  }


  async loginWithGoogle() {
    signInWithPopup(this.auth, new GoogleAuthProvider())
      .then(async googleResponse => {

        this.userService.googleAuthentication(googleResponse.user).subscribe({
          next: (response) => {
            (JSON.stringify(response))
            localStorage.setItem('token', response?.data.accessToken)
            this.toaster.success(response.message)
            this.ngZone.run(() => this.router.navigate(['/find-Doctors']));

          },
          error:(err)=>{
            console.log('Error', err?.error.message);            
            this.toaster.error('Error', err?.error.message)

          }
        })



      }).catch(err => {
        console.log('Login Error:', err);
        this.toaster.error( 'Failed to log in with Google. Please try again!')
      });
  }
}