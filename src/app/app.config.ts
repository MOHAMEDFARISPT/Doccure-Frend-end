import { provideRouter } from '@angular/router';
import { userRoute } from './Users/user.routes.routing';
import { DoctorRoutes } from './Doctors/Components/doctor.routes.routing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { AdminRouted } from './Admin/admin.routes';
import { userreducer } from  './Users/Store/User/user.reducer'
import { StoreModule, provideStore } from '@ngrx/store';
import { reduce } from 'rxjs';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './Users/Store/User/user.effects';
import { provideToastr } from 'ngx-toastr';
import { DoctorReducer } from './Doctors/Store/doctor.reducer';
import { DoctorEffects } from './Doctors/Store/doctor.effects';







const appRoutes = [...userRoute, ...DoctorRoutes,...AdminRouted];

export const appConfig = {
  providers: [
    provideAnimations(),
    provideToastr({timeOut:1300,preventDuplicates:true}),
    provideRouter(appRoutes),
    importProvidersFrom(
      HttpClientModule,
      BrowserAnimationsModule,
      EffectsModule.forRoot([UserEffects,DoctorEffects]),
      StoreModule.forRoot({ user:userreducer,Doctor:DoctorReducer}) 
    )
  ]
  
};


