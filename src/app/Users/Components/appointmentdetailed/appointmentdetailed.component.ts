import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../sharedComponents/Components/navBar/navbar.component';
import { UserSlidebarComponent } from '../../../sharedComponents/Components/user-slidebar/user-slidebar.component';
import { Auth } from '@angular/fire/auth';
import { AuthState } from '../../../Doctors/Store/doctor.state';
import { select, Store } from '@ngrx/store';
import * as userActions from '../../Store/User/user.actions'
import { selectUser } from '../../Store/User/user.selector';
import { Observable } from 'rxjs';
import { UserModel } from '../../Store/User/userModel';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserServicesService } from '../../services/user-services.service';
import { Appointment } from '../../Interfaces/userInterface';
import { TimeFormatPipe } from '../../../TimeFormatePipe/time-format.pipe';
import { CapitalizePipe } from '../../../cemelcase.pipe';
import { commonResponse } from '../../../Admin/interfaces/interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointmentdetailed',
  standalone: true,
  imports: [UserSlidebarComponent,NavbarComponent,TimeFormatPipe,CapitalizePipe,CommonModule,RouterModule,FormsModule],
  templateUrl: './appointmentdetailed.component.html',
  styleUrl: './appointmentdetailed.component.css'
})
export class AppointmentdetailedComponent implements OnInit {
  user$!:Observable<UserModel | null>
  Appointment$!:Observable<Appointment>
  
  showModal: boolean = false;
  askReason: boolean = false;
  selectedAppointmentId: string | null = null;
  cancellationReason: string = ''; // Holds the selected reason or the 'Other' reason
  otherReason: string = ''; 

  constructor(private store:Store<AuthState>,
    private route:ActivatedRoute,
    private userService:UserServicesService
  ){}
  userId!:string | null;
  appointmentId!:string;

  ngOnInit(): void {
    // Get the appointmentId from the route
    this.appointmentId = this.route.snapshot.paramMap.get('apId') || '';
    this.user$ = this.store.pipe(select(selectUser));
  
    // Subscribe to the user observable to get the userId
    this.user$.subscribe((user) => {
      this.userId = user?._id || null; 

  
  
      if (this.userId) {
       this.Appointment$=this.userService.getAppointment(this.appointmentId, this.userId)
      } else {
       
        
      }
    });
  }

  openModal(appointmentId: string): void {
    this.selectedAppointmentId = appointmentId;
    this.showModal = true;
  }

  // Close the modal
  closeModal(): void {
    this.showModal = false;
    this.askReason = false;  // Reset to initial state
    this.cancellationReason = '';  // Reset reason input
    this.otherReason = ''; // Reset other reason input
    this.selectedAppointmentId = null;
  }

  // Ask for the reason after the user clicks "Yes, Cancel"
  askForReason(): void {
    this.askReason = true;
  }

  // Submit cancellation with reason
  submitCancellation(): void {
    let reasonToSubmit = this.cancellationReason;

    // If 'Other' is selected, use the input from otherReason
    if (this.cancellationReason === 'Other') {
      reasonToSubmit = this.otherReason.trim();
    }

    if (reasonToSubmit) {
      console.log(`Appointment with ID ${this.selectedAppointmentId} is canceled. Reason: ${reasonToSubmit}`);
      // Call your cancel logic with the reason here
      this.cancelAppointment(this.selectedAppointmentId, reasonToSubmit);
    } else {
      alert('Please provide a reason for cancellation.');
    }
    this.closeModal();
  }


  cancelAppointment(appointmentId: string | null,reason:string): void {
    alert("Code Implimented  And Backend refund to wallet setup only pending")
    // this.userService.cancellAppointment(appointmentId,this.userId,reason).subscribe({
    //   next:(res:commonResponse)=>{
    //     console.log("res",res)
    //   }
    // })
   
    
  
    
  }
  






}
