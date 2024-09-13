import { provideRouter } from '@angular/router';
import { userRoute } from './Users/user.routes.routing';
import { DoctorRoutes } from './Doctors/doctor.routes.routing'
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { importProvidersFrom, NgModule } from '@angular/core';
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
import { firebaseConfig } from '../Environement/environment';
import { globalReducer } from './GolbalStore/global.reducer';
import { GlobalEffects } from './GolbalStore/global.effects';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getDatabase } from '@angular/fire/database';
import { provideDatabase } from '@angular/fire/database';
import { JwtInterceptor } from './Users/Intercepters/jwt.intercepter';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';






const appRoutes = [...userRoute, ...DoctorRoutes,...AdminRouted];
export const appConfig = {
  providers: [
    provideAnimations(),
    provideToastr({timeOut:1300,preventDuplicates:true}),
    provideRouter(appRoutes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideDatabase(() => getDatabase()),
    importProvidersFrom(
      HttpClientModule,
      BrowserAnimationsModule,
      EffectsModule.forRoot([UserEffects,DoctorEffects,GlobalEffects]),
      StoreModule.forRoot({ user:userreducer,Doctor:DoctorReducer,global: globalReducer}) ,
      
       
      
    ),{
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }, provideAnimationsAsync()
   
  ]
  
};




