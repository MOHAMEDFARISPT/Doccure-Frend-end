import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../Doctor-sharedComponent/sidebar/sidebar.component';
import { CapitalizePipe } from '../../../cemelcase.pipe';
import { TimeFormatPipe } from '../../../TimeFormatePipe/time-format.pipe';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllUsers } from '../../../GolbalStore/global.selectors';
import { User } from '../../../GolbalStore/global.model';
import { loadUsers } from '../../../GolbalStore/global.action';
import { HumanlistingTableComponent } from '../../../Admin/shared/humanlisting-table/humanlisting-table.component';
import { calculateAge } from '../../../../../utilities/validation';

@Component({
  selector: 'app-my-patients',
  standalone: true,
  imports: [SidebarComponent,HumanlistingTableComponent],
  templateUrl: './my-patients.component.html',
  styleUrl: './my-patients.component.css'
})
export class MyPatientsComponent implements OnInit {
  patientTableHeaders: string[] = ['No', 'PatientName', 'Age', 'PhoneNumber', 'Gender'];
  patientTableData: {No:number,PatientName:string,Age:number,PhoneNumber:string | undefined,Gender:string | undefined}[] = [];

  // Observable to hold the patients list from the store
  patients$: Observable<User[]> = this.store.select(selectAllUsers);
  constructor(private store:Store){}


  ngOnInit(): void {
    this.store.dispatch(loadUsers())
    // Subscribe to the patients observable
    this.patients$.subscribe(patientsResponse => {
      if (Array.isArray(patientsResponse)) {
        console.log("patientsResponse////",patientsResponse)
   
        this.patientTableData = patientsResponse.map((patient, index) => ({
          No: index + 1,
          PatientName: `${patient.firstName} ${patient.lastName}`,
          Age:calculateAge(patient.dateOfBirth),
          PhoneNumber: patient.contactNumber,
          Gender: patient.gender,
        }));
      } else {
        this.patientTableData = [];
      }
    });
  }
   
    
  }


