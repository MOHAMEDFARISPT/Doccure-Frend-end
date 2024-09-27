import { Component, OnInit } from '@angular/core';
import { AdminSlidebarComponent } from '../../shared/admin-slidebar/admin-slidebar.component';
import { HumanlistingTableComponent } from "../../shared/humanlisting-table/humanlisting-table.component";
import { SearchandFiltersComponent } from "../../../sharedComponents/searchand-filters/searchand-filters.component";
import { Observable } from 'rxjs';
import { doctorDetails } from '../../interfaces/interface';
import { AuthState } from '../../../Doctors/Store/doctor.state';
import { select, Store } from '@ngrx/store';
import { AdminServiceService } from '../../services/admin-service.service';
import { loadDoctors, loadUsers } from '../../../GolbalStore/global.action';
import { Doctor, User } from '../../../GolbalStore/global.model';
import { selectAllDoctors, selectAllUsers } from '../../../GolbalStore/global.selectors';
import { user } from '../../../Users/Store/User/userModel';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [AdminSlidebarComponent, HumanlistingTableComponent, SearchandFiltersComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  totalPatients!:number;
  totalDoctors!:number;
  totalAppointments!:number

  doctors$!: Observable<Doctor[]>
  users$!:Observable<User[]>

  DoctorId$!:Observable<doctorDetails>;
  constructor(
    private store:Store<AuthState>,
    private AdminService:AdminServiceService
  ){

  }


  ngOnInit(): void {
    this.store.dispatch(loadDoctors());
    this.doctors$=this.store.pipe(select(selectAllDoctors))

    this.doctors$.subscribe((doctor)=>{
      this.totalDoctors=doctor.length
      console.log( "this.totalDoctors////", this.totalDoctors)
    })

    this.store.dispatch(loadUsers())
    this.users$=this.store.pipe(select(selectAllUsers))

    this.users$.subscribe((user)=>{
      this.totalPatients=user.length

    })

    


    
  }

}
