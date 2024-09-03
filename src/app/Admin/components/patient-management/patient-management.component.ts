import { Component, OnInit } from '@angular/core';
import { AdminSlidebarComponent } from "../../shared/admin-slidebar/admin-slidebar.component";
import { SearchandFiltersComponent } from "../../../sharedComponents/searchand-filters/searchand-filters.component";
import { CommonModule } from '@angular/common';
import { HumanlistingTableComponent } from "../../shared/humanlisting-table/humanlisting-table.component";
import { AdminServiceService } from '../../services/admin-service.service';

@Component({
  selector: 'app-patient-management',
  standalone: true,
  imports: [AdminSlidebarComponent, SearchandFiltersComponent, CommonModule, HumanlistingTableComponent],
  templateUrl: './patient-management.component.html',
  styleUrl: './patient-management.component.css'
})
export class PatientManagementComponent implements OnInit {
  constructor(private AdminService:AdminServiceService){}

  patientTableHeaders: string[] = ['No', 'patientName', 'Age', 'PhoneNumber', 'PaidAmount',];
  patientTableData: any[] = [];
  dropdownOpen = false;
  index=0

  ngOnInit(): void {
    // Fetching data from the service
    this.AdminService.getPatients().subscribe({
      next: (res) => {
        // Transform the response to match your table headers
        this.patientTableData = res.map((patient: { firstName: any; lastName: any; dateOfBirth: any; email: any; contactNumber: any;  }, index: number) => ({
          No: index + 1,  // or patient._id if you want to use the actual database ID
          patientName: `${patient.firstName} ${patient.lastName}`,
          Age: this.calculateAge(patient.dateOfBirth),  // Assuming dateOfBirth is a Date object
          PhoneNumber: patient.contactNumber,
          PaidAmount: 0 , // You can update this based on your data

        }));
        
      },
      error: (err) => {
        console.error('Error fetching patient data:', err);
      }
    });
  }


  calculateAge(dateOfBirth: Date): number {
    const diff = Date.now() - new Date(dateOfBirth).getTime();
    const ageDt = new Date(diff); 
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  resetFilters() {
    // Implement your reset logic here
    console.log('Filters reset');
  }

  saveFilters() {
    // Implement your save logic here
    console.log('Filters saved');
  }

}
