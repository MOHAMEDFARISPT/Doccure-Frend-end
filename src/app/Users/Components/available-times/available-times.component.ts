import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../../sharedComponents/Components/navBar/navbar.component";
import { UserSlidebarComponent } from "../../../sharedComponents/Components/user-slidebar/user-slidebar.component";
import { SearchandFiltersComponent } from "../../../sharedComponents/searchand-filters/searchand-filters.component";
import { UserServicesService } from '../../services/user-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { Doctor } from '../../../GolbalStore/global.model';
import { selectAllDoctors } from '../../../GolbalStore/global.selectors';
import { Store } from '@ngrx/store';
import { loadDoctors } from '../../../GolbalStore/global.action';
import { CommonModule } from '@angular/common';
import { AvailableTimeResponse } from '../../../Admin/interfaces/interface';
import { TimeFormatPipe } from "../../../TimeFormatePipe/time-format.pipe";
import { ToastrService } from 'ngx-toastr';
import { proccedTopay, TimeSlot } from '../../Interfaces/userInterface';

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
  selectedTime!: TimeSlot;
  selectedTimes!: TimeSlot[]  // Use TimeSlot type for better clarity
  appointmentDetails: any;
  Doctorid!: string | null;
   drid!:string | null;

  constructor(
    private userService: UserServicesService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.Doctorid = this.route.snapshot.paramMap.get('id');
    if (this.Doctorid) {
      this.store.dispatch(loadDoctors());

      this.doctor$ = this.doctors$.pipe(
        map((doctors: Doctor[]) => doctors.find(doctor => doctor._id === this.Doctorid))
      );

      // Debugging - log the selected doctor
      this.doctor$.pipe(
        tap((doctor: Doctor | undefined) => console.log('Selected Doctor:', doctor))
      ).subscribe();
    }

    this.loadSlots();  // Load slots on initialization
  }

  SelectedDay(day: string): void {
    this.selectedDay = day;
    this.loadSlots();
  }

  selectTime(time: TimeSlot): void {
    this.selectedTime = time; // Keep the entire object if needed
  }

  loadSlots(): void {
  this.drid = this.route.snapshot.paramMap.get('id');
    if (this.drid) {
      this.userService.loadAvailableTime(this.drid, this.selectedDay).subscribe({
        next: (res: AvailableTimeResponse) => {
          if (res.success) {
            console.log("Slots are ready", res.slots);
            this.selectedTimes = res.slots;  // Assuming this is an array of TimeSlot
          }
        }
      });
    }
  }

  proceedToPay(): void {
    if (this.selectedDay && this.selectedTime) {
      this.doctor$.subscribe((doctor) => {
        if (doctor) {
          const { startTime, endTime, DoctorId } = this.selectedTime;

          // Create appointment details
          this.appointmentDetails = {
            DoctorId: DoctorId,
            startTime: startTime,
            endTime: endTime,
            day: this.selectedDay,
            DoctorName: `${doctor.personalDetails.firstName} ${doctor.personalDetails.lastName}`,
            Department: doctor.professionalDetails.specialisedDepartment,
            consultationFee: doctor.professionalDetails.consultationFee
          };

          // Navigate to checkout with the selected time
          this.navigateToCheckout(this.selectedTime);
        }
      });
    } else {
      this.toaster.error('Please select a slot for the Doctor');
    }
  }

  navigateToCheckout(time: TimeSlot): void {
    this.router.navigate(['/checkout'], {
      queryParams: {
        DoctorId:this.drid,
        timeId: time._id,  // Pass only the _id or other relevant properties
        startTime: time.startTime,
        endTime: time.endTime,
        selectedDay:this.selectedDay
      }
    });
  }
}
