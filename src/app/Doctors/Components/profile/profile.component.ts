import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../Doctor-sharedComponent/sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { parse } from 'dotenv';
import { DateTransformPipe } from "../../../date-transform.pipe";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SidebarComponent, CommonModule, DateTransformPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
DoctorData:any;

  selectedButton: string = 'Personal Details';
 

 






  ngOnInit(): void {
    const DoctorProfile = localStorage.getItem('Doctor');
  
    if (DoctorProfile) {
      const parsedDoctorProfile = JSON.parse(DoctorProfile);
      this.DoctorData=parsedDoctorProfile
      
      
    } else {
      console.log("No Doctor profile found in localStorage.");
    }
  }
  onSelect(buttonName: string): void {
    this.selectedButton = buttonName;
  }


}



 

