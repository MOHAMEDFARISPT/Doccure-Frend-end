import { Component, OnInit } from '@angular/core';
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
import { MyAppointmentsComponent } from './Users/Components/my-appointments/my-appointments.component';
import { AdminRegistercomponent } from './Admin/components/admin-registercomponent/admin-registercomponent.component';
import { AdminloginComponent } from './Admin/components/adminlogin-component/adminlogin-component.component';
import { AdminDashboardComponent } from './Admin/components/admin-dashboard/admin-dashboard.component';
import { OnDisconnect } from 'firebase/database';
import * as userActions from'./Users/Store/User/user.actions'
import { AppState } from './Users/Store/User/user.state';
import { Store } from '@ngrx/store';









@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule,
     RouterOutlet, NavbarComponent,FooterComponent,
     RegisterComponent, UserLoginComponent, RouterModule,
     DoctorLoginComponent,DoctorSignupComponent,MyAppointmentsComponent,
     AdminRegistercomponent,AdminloginComponent,AdminDashboardComponent
      ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit   {
title = 'Doccure-FrendEnd';
constructor(private store:Store<AppState>){}

ngOnInit(): void {
  this.store.dispatch(userActions.loaduser())
  
}






}

