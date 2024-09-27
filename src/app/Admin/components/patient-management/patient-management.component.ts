import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../../GolbalStore/global.model'; 
import { selectAllUsers } from '../../../GolbalStore/global.selectors';
import { loadUsers } from '../../../GolbalStore/global.action';
import { AdminSlidebarComponent } from '../../shared/admin-slidebar/admin-slidebar.component';
import { HumanlistingTableComponent } from '../../shared/humanlisting-table/humanlisting-table.component';
import { calculateAge } from '../../../../../utilities/validation'; 
import { PaginationComponent } from "../../../sharedComponents/Components/pagination/pagination.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-management',
  standalone: true,
  imports: [AdminSlidebarComponent, HumanlistingTableComponent, PaginationComponent, CommonModule],
  templateUrl: './patient-management.component.html',
  styleUrls: ['./patient-management.component.css'], // Ensure this is correct
})
export class PatientManagementComponent implements OnInit {
  patientTableHeaders: string[] = ['No', 'PatientName', 'Age', 'PhoneNumber', 'paidAmount'];
  patientTableData: {No:number,PatientName:string,Age:number,PhoneNumber:string | undefined,paidAmount:number}[] = [];

  // Observable to hold the patients list from the store
  patients$: Observable<User[]> = this.store.select(selectAllUsers);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadUsers());

    // Subscribe to the patients observable
    this.patients$.subscribe(patientsResponse => {
      if (Array.isArray(patientsResponse)) {
   
        this.patientTableData = patientsResponse.map((patient, index) => ({
          No: index + 1,
          PatientName: `${patient.firstName} ${patient.lastName}`,
          Age:calculateAge(patient.dateOfBirth),
          PhoneNumber: patient.contactNumber,
          paidAmount: 0,
        }));
      } else {
        this.patientTableData = [];
      }
    });
  }
}
