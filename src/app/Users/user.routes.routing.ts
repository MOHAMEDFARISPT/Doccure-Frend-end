import { Routes } from '@angular/router';
import { UserLoginComponent } from './Components/user-login/user-login.component';
import { RegisterComponent } from './Components/register/register.component';
import { MyAppointmentsComponent } from './Components/my-appointments/my-appointments.component';
import { AuthGuard } from './Guards/auth.guard';


export const userRoute: Routes = [
  { path: 'User-login', component: UserLoginComponent },
  { path: 'User-register', component: RegisterComponent },
  {path:'my-appointments',component:MyAppointmentsComponent,canActivate:[AuthGuard]},
  { path: '', redirectTo: '/User-login', pathMatch: 'full' },
];
