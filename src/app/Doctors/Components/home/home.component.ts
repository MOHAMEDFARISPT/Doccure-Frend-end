import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../Doctor-sharedComponent/sidebar/sidebar.component";
import { select, Store } from '@ngrx/store';
import { AuthState } from '../../Store/doctor.state';
import * as DoctorActions   from '../../Store/doctor.action'
import { Observable } from 'rxjs';
import { doctorDetails } from '../../../Admin/interfaces/interface';
import { selectDoctor } from '../../Store/doctor.store';
import { CommonModule } from '@angular/common';
import { SearchandFiltersComponent } from '../../../sharedComponents/searchand-filters/searchand-filters.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, CommonModule,SearchandFiltersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private store:Store<AuthState>){}

Doctor$!:Observable<doctorDetails | null>
  
ngOnInit(): void {

    this.store.dispatch(DoctorActions.loadDoctor())

    this.Doctor$=this.store.pipe(select(selectDoctor))

   

    
  }
 

}
