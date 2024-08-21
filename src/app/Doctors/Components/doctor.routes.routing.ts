import { Routes } from "@angular/router";
import { DoctorLoginComponent } from "./doctor-login/doctor-login.component";
import { DoctorSignupComponent } from "./doctor-signup/doctor-signup.component";


export const DoctorRoutes: Routes = [
    { path: 'Doctor-login', component: DoctorLoginComponent },
    { path: 'Doctor-register', component: DoctorSignupComponent },
   
  ];