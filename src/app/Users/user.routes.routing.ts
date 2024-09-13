import { Routes } from '@angular/router';
import { UserLoginComponent } from './Components/user-login/user-login.component';
import { RegisterComponent } from './Components/register/register.component';
import { MyAppointmentsComponent } from './Components/my-appointments/my-appointments.component';
import { AuthGuard } from './Guards/auth.guard';
import { LandingPageComponent } from '../sharedComponents/Components/landing-page/landing-page.component';
import { DoctorslistComponent } from './Components/doctorslist/doctorslist.component';
import { ShowProfileComponent } from './Components/show-profile/show-profile.component';
import { AvailableTimesComponent } from './Components/available-times/available-times.component';


export const userRoute: Routes = [
  {path:'landing-Home',component:LandingPageComponent},
  {path:'find-Doctors',component:DoctorslistComponent,canActivate:[AuthGuard]},
  {path:'profile/:id',component:ShowProfileComponent},
  {path:'available-Times/:id',component:AvailableTimesComponent},
  { path: 'User-login', component: UserLoginComponent },
  { path: 'User-register', component: RegisterComponent },
  {path:'my-appointments',component:MyAppointmentsComponent,canActivate:[AuthGuard]},
  {path:'',redirectTo:'/landing-Home',pathMatch:'full'}
 
];
