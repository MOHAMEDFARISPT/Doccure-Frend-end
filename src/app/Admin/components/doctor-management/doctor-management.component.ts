import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Doctor } from '../../../GolbalStore/global.model'; // Ensure this path is correct
import { selectAllDoctors } from '../../../GolbalStore/global.selectors';
import { loadDoctors } from '../../../GolbalStore/global.action';
import { AdminSlidebarComponent } from '../../shared/admin-slidebar/admin-slidebar.component';
import { HumanlistingTableComponent } from '../../shared/humanlisting-table/humanlisting-table.component';
import { calculateAge } from '../../../../../utilities/validation';
import { PaginationComponent } from "../../../sharedComponents/Components/pagination/pagination.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-management',
  standalone: true,
  imports: [AdminSlidebarComponent, HumanlistingTableComponent, PaginationComponent,CommonModule],
  templateUrl: './doctor-management.component.html',
  styleUrls: ['./doctor-management.component.css'], // Corrected to styleUrls
})
export class DoctorManagementComponent implements OnInit {
  DoctorTableHeaders: string[] = ['No', 'DoctorName', 'Age', 'Specialisation', 'Experience'];
  DoctorTableData: {No:Number,DoctorName:string,Age:Number,Specialisation:string,Experience:number}[] = [];

  


  // Observable to hold the doctors list from the store
  doctors$: Observable<Doctor[]> = this.store.select(selectAllDoctors);

  constructor(private store: Store) {}

  ngOnInit(): void {
    
  
    this.store.dispatch(loadDoctors());
  
    this.doctors$.subscribe(doctorsResponse => {
  
   
  
      if (Array.isArray(doctorsResponse)) {
        this.DoctorTableData = doctorsResponse.map((doctor, index) => ({
          No: index + 1,

          DoctorName: `${doctor.personalDetails.firstName} ${doctor.personalDetails.lastName}`,
          Age: calculateAge(doctor.personalDetails.dateofBirth),
          Specialisation: doctor.professionalDetails.specialisedDepartment,
          Experience: doctor.professionalDetails.totalExperience,
        }));
      } else {
        this.DoctorTableData = [];
      }
    });
  }
  
  


}
