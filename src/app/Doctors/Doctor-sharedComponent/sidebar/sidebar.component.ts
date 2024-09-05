import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthState } from '../../Store/doctor.state';
import { select, Store } from '@ngrx/store';
import { selectDoctor } from '../../Store/doctor.store';
import { passwordStrengthValidator } from '../../../Users/utility/formvalidation';

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
routerLinkActive: any;
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
    // Your existing logic for item click
  }

 

 


  ngOnInit(): void {
    const DoctorProfile = localStorage.getItem('Doctor');
    
    if (DoctorProfile) {
      const parsedDoctorProfile = JSON.parse(DoctorProfile);

      if(parsedDoctorProfile){
        this.DoctorName=parsedDoctorProfile.personalDetails.firstName+' '+parsedDoctorProfile.personalDetails.lastName
        this.DoctorSpecialisation=parsedDoctorProfile.professionalDetails.specialisedDepartment
        this.Doctoremail=parsedDoctorProfile.personalDetails.email
      }
      
      
      
    } else {
      console.log("No Doctor profile found in localStorage.");
    }
  }

   
  
  
 

}
