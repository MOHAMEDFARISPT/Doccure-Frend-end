import { Routes } from "@angular/router";
import { AdminRegistercomponent } from "./components/admin-registercomponent/admin-registercomponent.component";
import { AdminloginComponent } from "./components/adminlogin-component/adminlogin-component.component";
import { AdminDashboardComponent } from "./components/admin-dashboard/admin-dashboard.component";
import { PatientManagementComponent } from "./components/patient-management/patient-management.component";
import { RequestesComponent } from "./components/requestes/requestes.component";
import { DoctorManagementComponent } from "./components/doctor-management/doctor-management.component";
import { AppointmentsComponent } from "./components/appointments/appointments.component";



export const AdminRouted: Routes = [
    {path:'Admin-register',component:AdminRegistercomponent},
    {path:'Admin-login',component:AdminloginComponent},
    {path:'Admin-Dashboard',component:AdminDashboardComponent},
    {path:'Approvel-Requests',component:RequestesComponent},
    {path:'Admin-patients-list',component:PatientManagementComponent},
    {path:'Admin-Doctor-list',component:DoctorManagementComponent},
    {path:'Admin-Appointments',component:AppointmentsComponent}
   
   
  ];