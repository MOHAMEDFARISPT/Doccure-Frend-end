import { Component } from '@angular/core';
import { SidebarComponent } from '../../Doctor-sharedComponent/sidebar/sidebar.component';
import { select, Store } from '@ngrx/store';
import { AuthState } from '../../Store/doctor.state';
import { doctorDetails } from '../../../Admin/interfaces/interface';
import { Observable } from 'rxjs';
import { selectDoctor } from '../../Store/doctor.store';
import * as DoctorActions from '../../Store/doctor.action'
import { CommonModule } from '@angular/common';
import { DoctorServiceService } from '../../services/doctor-service.service';
import { Appointment } from '../../../Users/Interfaces/userInterface';
import { TimeFormatPipe } from '../../../TimeFormatePipe/time-format.pipe';
import { CapitalizePipe } from '../../../cemelcase.pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [SidebarComponent, CommonModule, TimeFormatPipe, CapitalizePipe, RouterModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent {
  constructor(private store: Store<AuthState>,
    private doctorservice: DoctorServiceService
  ) { }

  Doctor$!: Observable<doctorDetails | null>
  DoctorId!: string | undefined;
  Appointments$!: Observable<Appointment[]>

  ngOnInit(): void {

    this.store.dispatch(DoctorActions.loadDoctor())

    this.Doctor$ = this.store.pipe(select(selectDoctor))
   
    this.Doctor$.subscribe((Doctor) => {
      this.DoctorId = Doctor?._id
      if (this.DoctorId) {
        this.Appointments$ = this.doctorservice.loadAppointments(this.DoctorId)
       





      }


    })





  }


}
