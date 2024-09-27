import { Routes } from '@angular/router';
import { UserLoginComponent } from './Components/user-login/user-login.component';
import { RegisterComponent } from './Components/register/register.component';
import { MyAppointmentsComponent } from './Components/my-appointments/my-appointments.component';
import { AuthGuard } from './Guards/auth.guard';
import { LandingPageComponent } from '../sharedComponents/Components/landing-page/landing-page.component';
import { DoctorslistComponent } from './Components/doctorslist/doctorslist.component';
import { ShowProfileComponent } from './Components/show-profile/show-profile.component';
import { AvailableTimesComponent } from './Components/available-times/available-times.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { AuthLeaveGuard } from './Guards/deactivate.guard';
import { AppointmentSuccessComponent } from './Components/appointment-success/appointment-success.component';
import { WalletComponent } from './Components/wallet/wallet.component';
import { AppointmentdetailedComponent } from './Components/appointmentdetailed/appointmentdetailed.component';



export const userRoute: Routes = [
  {path:'landing-Home',component:LandingPageComponent},
  {path:'find-Doctors',component:DoctorslistComponent,canActivate:[AuthGuard]},
  {path:'profile/:id',component:ShowProfileComponent},
  {path:'available-Times/:id',component:AvailableTimesComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'Success',component:AppointmentSuccessComponent},
  {path:'Wallet/:userId',component:WalletComponent},
  { path: 'User-login', component: UserLoginComponent },
  { path: 'User-register', component: RegisterComponent },
  {path:'my-appointments/:userId',component:MyAppointmentsComponent,canActivate:[AuthGuard]},
  {path:'appointment-detailes/:apId',component:AppointmentdetailedComponent,canActivate:[AuthGuard]},
  {path:'',redirectTo:'/landing-Home',pathMatch:'full'}
 
];
