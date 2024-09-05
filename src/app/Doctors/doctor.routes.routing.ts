import { Routes } from "@angular/router";

import { HomeComponent } from "./Components/home/home.component";
import { DoctorLoginComponent } from "./Components/doctor-login/doctor-login.component";
import { DoctorSignupComponent } from "./Components/doctor-signup/doctor-signup.component";
import { AuthGuard } from "./Guards/Auth.guard";
import { AvailableTimingsComponent } from "./Components/available-timings/available-timings.component";



export const DoctorRoutes: Routes = [
    { path: 'Doctor-login', component: DoctorLoginComponent },
    { path: 'Doctor-register', component: DoctorSignupComponent },
     {path:'Doctor-Dashboard',component:HomeComponent,canActivate:[AuthGuard]},
     {path:'availableTimings',component:AvailableTimingsComponent}
   
  ];