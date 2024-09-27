import { Component, OnInit } from '@angular/core';
import { UserSlidebarComponent } from '../../../sharedComponents/Components/user-slidebar/user-slidebar.component';
import { NavbarComponent } from '../../../sharedComponents/Components/navBar/navbar.component';
import { FooterComponent } from '../../../sharedComponents/Components/footer/footer.component';
import { SearchandFiltersComponent } from "../../../sharedComponents/searchand-filters/searchand-filters.component";
import { UserServicesService } from '../../services/user-services.service';
import { AppState } from '../../Store/User/user.state';
import { Store } from '@ngrx/store';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Appointment } from '../../Interfaces/userInterface';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '../../../cemelcase.pipe';
import { TimeFormatPipe } from '../../../TimeFormatePipe/time-format.pipe';


@Component({
  selector: 'app-my-appointments',
  standalone: true,
  imports: [UserSlidebarComponent,TimeFormatPipe,CapitalizePipe,NavbarComponent,CommonModule,FooterComponent,RouterModule,SearchandFiltersComponent],
  templateUrl: './my-appointments.component.html',
  styleUrl: './my-appointments.component.css'
})
export class MyAppointmentsComponent implements OnInit  {

  patientId!:string;
  Appointments$!:Observable<Appointment[]>

  constructor(private userService:UserServicesService,
    private route:ActivatedRoute,
    private store:Store<AppState>
  ){}



  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('userId') || ''; 
    this.Appointments$=this.userService.loadAppointments(this.patientId)
  }


}
