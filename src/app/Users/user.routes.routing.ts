import { Routes } from '@angular/router';
import { UserLoginComponent } from './Components/user-login/user-login.component';
import { RegisterComponent } from './Components/register/register.component';
import { MyAppointmentsComponent } from './Components/my-appointments/my-appointments.component';
import { AuthGuard } from './Guards/auth.guard';
import { LandingPageComponent } from '../sharedComponents/Components/landing-page/landing-page.component';


export const userRoute: Routes = [
  {path:'landing-Home',component:LandingPageComponent},
  { path: 'User-login', component: UserLoginComponent },
  { path: 'User-register', component: RegisterComponent },
  {path:'my-appointments',component:MyAppointmentsComponent,canActivate:[AuthGuard]},
  {path:'',redirectTo:'/landing-Home',pathMatch:'full'}
 
];
