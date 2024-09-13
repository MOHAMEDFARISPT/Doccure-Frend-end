import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../../sharedComponents/Components/navBar/navbar.component";
import { UserSlidebarComponent } from "../../../sharedComponents/Components/user-slidebar/user-slidebar.component";
import { SearchandFiltersComponent } from "../../../sharedComponents/searchand-filters/searchand-filters.component";
import { UserServicesService } from '../../services/user-services.service';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { Doctor } from '../../../GolbalStore/global.model';
import { selectAllDoctors } from '../../../GolbalStore/global.selectors';
import { Store } from '@ngrx/store';
import { loadDoctors } from '../../../GolbalStore/global.action';
import { CommonModule } from '@angular/common';
import { AvailableTimeResponse } from '../../../Admin/interfaces/interface';
import { TimeFormatPipe } from "../../../TimeFormatePipe/time-format.pipe";

@Component({
  selector: 'app-available-times',
  standalone: true,
  imports: [NavbarComponent, UserSlidebarComponent, CommonModule, SearchandFiltersComponent, TimeFormatPipe],
  templateUrl: './available-times.component.html',
  styleUrl: './available-times.component.css'
})
export class AvailableTimesComponent implements OnInit {
  doctors$: Observable<Doctor[]> = this.store.select(selectAllDoctors);
  doctor$!: Observable<Doctor | undefined>;
  selectedDay: string = 'Monday';
  selectedTimes: any[] =[]  // Initialize as an empty array

  constructor(
    private userService: UserServicesService,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.dispatch(loadDoctors());

      this.doctor$ = this.doctors$.pipe(
        map((doctors: Doctor[]) => doctors.find(doctor => doctor._id === id))
      );

      // Debugging - log the selected doctor
      this.doctor$.pipe(
        tap((doctor: Doctor | undefined) => console.log('Selected Doctor:', doctor))
      ).subscribe();
    } else {
    
    }

    this.loadSlots();  // Ensure this is necessary
  }

  SelectedDay(day: string): void {
    this.selectedDay = day;
    this.loadSlots();
  }
  loadSlots(): void {
    const drid = this.route.snapshot.paramMap.get('id');
    if (drid) {
      this.userService.loadAvailableTime(drid, this.selectedDay).subscribe({
        next: (res: AvailableTimeResponse) => {
          console.log(res.slots)
          if (res.success) {
            this.selectedTimes=res.slots
        
          }
        }
      });
    }
  }
  
}




  


