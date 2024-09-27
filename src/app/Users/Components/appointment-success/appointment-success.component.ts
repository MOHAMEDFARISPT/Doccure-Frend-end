import { Component } from '@angular/core';
import { UserSlidebarComponent } from '../../../sharedComponents/Components/user-slidebar/user-slidebar.component';
import { NavbarComponent } from '../../../sharedComponents/Components/navBar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { doctorDetails } from '../../../Admin/interfaces/interface';
import { AuthState } from '../../../Doctors/Store/doctor.state';
import { select, Store } from '@ngrx/store';
import * as  DoctorActions from '../../../Doctors/Store/doctor.action'
import { selectDoctor } from '../../../Doctors/Store/doctor.store';

@Component({
  selector: 'app-appointment-success',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './appointment-success.component.html',
  styleUrl: './appointment-success.component.css'
})
export class AppointmentSuccessComponent {
  DoctorfirstName!:string | undefined;
  DoctorlastName!:string| undefined;
  Doctor$!:Observable<doctorDetails | null>
  constructor(
    private route:ActivatedRoute,
    private store:Store<AuthState>

  ){}


  ngOnInit(): void {
    this.store.dispatch(DoctorActions.loadDoctor())

    this.Doctor$=this.store.pipe(select(selectDoctor))

    this.Doctor$.subscribe((Doctor)=>{
      this.DoctorfirstName=Doctor?.personalDetails.firstName
      this.DoctorlastName=Doctor?.personalDetails.lastName
    })
    
    this.route.queryParams.subscribe((params: { [x: string]: any; }) => {
      this.DoctorfirstName = params['id'];
    });


  }

}
