import { Component, OnInit } from '@angular/core';
import { AdminSlidebarComponent } from '../../shared/admin-slidebar/admin-slidebar.component';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Appointment } from '../../../Users/Interfaces/userInterface';
import { loadAppointments } from '../../../GolbalStore/global.action';
import { loadAllAppointments } from '../../../GolbalStore/global.selectors';
import { TimeFormatPipe } from '../../../TimeFormatePipe/time-format.pipe';
import { CapitalizePipe } from '../../../cemelcase.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [AdminSlidebarComponent,TimeFormatPipe,CapitalizePipe,CommonModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent implements OnInit {
  constructor(
    private store:Store
  ){}

  Appointments$: Observable<Appointment[]> = this.store.pipe(select(loadAllAppointments)  // Use a proper selector to get appointments from state
  );

  


  ngOnInit(): void {
    this.store.dispatch(loadAppointments())



    
  }



}
