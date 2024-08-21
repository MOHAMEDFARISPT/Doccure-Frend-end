import { provideRouter } from '@angular/router';
import { userRoute } from './Users/user.routes.routing';
import { DoctorRoutes } from './Doctors/Components/doctor.routes.routing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const appRoutes = [...userRoute, ...DoctorRoutes];

export const appConfig = {
  providers: [provideRouter(appRoutes), importProvidersFrom(HttpClientModule),importProvidersFrom(BrowserAnimationsModule)],
  
};
