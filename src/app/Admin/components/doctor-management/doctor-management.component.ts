import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Doctor } from '../../../GolbalStore/global.model'; // Ensure this path is correct
import { selectAllDoctors } from '../../../GolbalStore/global.selectors';
import { loadDoctors } from '../../../GolbalStore/global.action';
import { AdminSlidebarComponent } from '../../shared/admin-slidebar/admin-slidebar.component';
import { HumanlistingTableComponent } from '../../shared/humanlisting-table/humanlisting-table.component';

@Component({
  selector: 'app-doctor-management',
  standalone: true,
  imports: [AdminSlidebarComponent, HumanlistingTableComponent],
  templateUrl: './doctor-management.component.html',
  styleUrls: ['./doctor-management.component.css'], // Corrected to styleUrls
})
export class DoctorManagementComponent implements OnInit {
  DoctorTableHeaders: string[] = ['No', 'DoctorName', 'Age', 'Email', 'Specialisation', 'Experience'];
  DoctorTableData: any[] = [];

  // Observable to hold the doctors list from the store
  doctors$: Observable<Doctor[]> = this.store.select(selectAllDoctors);

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Dispatch action to load doctors when the component initializes
    this.store.dispatch(loadDoctors());
  
    this.doctors$.subscribe(doctorsResponse => {
      console.log("firstinitialDoctor//", doctorsResponse);
  
    
  
      if (Array.isArray(doctorsResponse)) {
        console.log("doctors array:", doctorsResponse);
        this.DoctorTableData = doctorsResponse.map((doctor, index) => ({
          No: index + 1,
          DoctorName: `${doctor.personalDetails.firstname} ${doctor.personalDetails.lastname}`,
          Age: this.calculateAge(doctor.personalDetails.dateOfBirth),
          Email: doctor.personalDetails.email,
          Specialisation: doctor.professionalDetails.specialisedDepartment,
          Experience: doctor.professionalDetails.totalExperience,
        }));
      } else {
        this.DoctorTableData = [];
      }
    });
  }
  
  

  // Utility function to calculate age from date of birth
  private calculateAge(dateOfBirth: Date): number {
    const diff = Date.now() - new Date(dateOfBirth).getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
