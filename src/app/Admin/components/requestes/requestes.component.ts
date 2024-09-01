import { Component, OnInit } from '@angular/core';
import { AdminSlidebarComponent } from "../../shared/admin-slidebar/admin-slidebar.component";
import { AdminServiceService } from '../../services/admin-service.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DoctorDetails } from '../../interfaces/interface';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-requestes',
  standalone: true,
  imports: [AdminSlidebarComponent,CommonModule],
  templateUrl: './requestes.component.html',
  styleUrl: './requestes.component.css'
})
export class RequestesComponent implements OnInit {
  doctorDetails: DoctorDetails[] = [];
  loadingMap: { [doctorId: string]: boolean } = {};
  constructor(
    private AdminService:AdminServiceService,
    private toastrService:ToastrService

  ){}


  ngOnInit(): void {
    this.AdminService.getDoctorDetails().subscribe({
      next: (res:any) => {
        if (res && Array.isArray(res.responseData)) {
          this.doctorDetails = res.responseData; // Assign the responseData array to doctorDetails
        } else {
          console.error('Expected an array, but got:', res);
        }
      },
      error: (err) => {
        console.error('Error fetching doctor details:', err);
      }
    });
  }

  acceptRequest(doctorId: string): void {
    this.loadingMap[doctorId] = true;
    console.log('Accepting request for doctor ID:', doctorId);
    this.AdminService.acceptDoctorRequest(doctorId).subscribe({
      next: (response) => {
        this.toastrService.success(response.message);
        this.loadingMap[doctorId] = false;
        location.reload();
      },
      error: (err) => {
        this.toastrService.error("Try Again Later");
        this.loadingMap[doctorId] = false;
      }
    });
  }
}

