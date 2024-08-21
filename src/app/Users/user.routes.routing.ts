import { Routes } from '@angular/router';
import { UserLoginComponent } from './Components/user-login/user-login.component';
import { RegisterComponent } from './Components/register/register.component';

export const userRoute: Routes = [
  { path: 'User-login', component: UserLoginComponent },
  { path: 'User-register', component: RegisterComponent },
  { path: '', redirectTo: '/User-login', pathMatch: 'full' },
];
