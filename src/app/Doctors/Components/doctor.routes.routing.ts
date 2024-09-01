import { Routes } from "@angular/router";
import { DoctorLoginComponent } from "./doctor-login/doctor-login.component";
import { DoctorSignupComponent } from "./doctor-signup/doctor-signup.component";
import { HomeComponent } from "./home/home.component";


export const DoctorRoutes: Routes = [
    { path: 'Doctor-login', component: DoctorLoginComponent },
    { path: 'Doctor-register', component: DoctorSignupComponent },
     {path:'Home',component:HomeComponent}
   
  ];