import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './sharedComponents/Components/navBar/navbar.component';
import { FooterComponent } from "./sharedComponents/Components/footer/footer.component";
import { RegisterComponent } from "./Users/Components/register/register.component";
import { UserLoginComponent } from "./Users/Components/user-login/user-login.component";
import { DoctorLoginComponent } from "./Doctors/Components/doctor-login/doctor-login.component";
import { DoctorSignupComponent } from "./Doctors/Components/doctor-signup/doctor-signup.component";
// import { authReducer } from './Users/Store/User/user.reducer';


import { bootstrapApplication } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';






@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule,
     RouterOutlet,
     NavbarComponent,
     FooterComponent, RegisterComponent, UserLoginComponent, RouterModule, DoctorLoginComponent, DoctorSignupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
title = 'Doccure-FrendEnd';





}

