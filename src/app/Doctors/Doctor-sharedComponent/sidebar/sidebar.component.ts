import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthState } from '../../Store/doctor.state';
import { doctorDetails } from '../../../Admin/interfaces/interface';
import * as DoctorActions from '../../Store/doctor.action'
import { select, Store } from '@ngrx/store';
import { selectDoctor } from '../../Store/doctor.store';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  isSidebarOpen = false;
  activeItem: string = 'Dashboard';
routerLinkActive!: string;
doctor$!: Observable<doctorDetails | null>;
DoctorName!:string;
DoctorSpecialisation!:string
Doctoremail!:string;

constructor(private store: Store<AuthState>){}

  






  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  handleSidebarItemClick(item: string) {
    this.activeItem = item;
  }

 

 


  ngOnInit(): void {
    this.store.dispatch(DoctorActions.loadDoctor())
  this.doctor$=this.store.pipe(select(selectDoctor))

 





    // const DoctorProfile = localStorage.getItem('Doctor');
    
    // if (DoctorProfile) {
    //   const parsedDoctorProfile = JSON.parse(DoctorProfile);

    //   if(parsedDoctorProfile){
    //     this.DoctorName=parsedDoctorProfile.personalDetails.firstName+' '+parsedDoctorProfile.personalDetails.lastName
    //     this.DoctorSpecialisation=parsedDoctorProfile.professionalDetails.specialisedDepartment
    //     this.Doctoremail=parsedDoctorProfile.personalDetails.email
    //   }
      
      
      
    // } else {
    //   console.log("No Doctor profile found in localStorage.");
    // }
  }

   
  
  
 

}
