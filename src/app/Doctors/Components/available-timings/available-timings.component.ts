import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../Doctor-sharedComponent/sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddSlotModalComponent } from "../../Doctor-sharedComponent/add-slot-modal/add-slot-modal.component";
import { initFlowbite } from 'flowbite';
import { DoctorServiceService } from '../../services/doctor-service.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { reload } from 'firebase/auth';
import { DoctorSlotService } from '../../services/doctor-slotsService.service';
import { AvailableTimeResponse, commonResponse, doctorDetails, slots } from '../../../Admin/interfaces/interface';
import { TimeFormatPipe } from '../../../TimeFormatePipe/time-format.pipe';
import { select, Store } from '@ngrx/store';
import { AuthState } from '../../Store/doctor.state';
import * as DoctorActions from '../../Store/doctor.action'
import { selectDoctor } from '../../Store/doctor.store';
import { TimeSlot } from '../../../Users/Interfaces/userInterface';

@Component({
  selector: 'app-available-timings',
  standalone: true,
  imports: [SidebarComponent, CommonModule, ReactiveFormsModule, FormsModule, AddSlotModalComponent, TimeFormatPipe],
  templateUrl: './available-timings.component.html',
  styleUrls: ['./available-timings.component.css']
})
export class AvailableTimingsComponent implements OnInit {
  constructor(
    private doctorService: DoctorServiceService,
    private doctorslotService: DoctorSlotService,
    private toasterService: ToastrService,
    private store:Store<AuthState>
  ) { }

  selectedDay: string = 'Monday';
  selectedTimes: slots[] = [];
  openModal: boolean = false;
  DoctorId$!: Observable<doctorDetails | null>;
  doctorId:string |undefined
  selectedTime!:TimeSlot;

  ngOnInit(): void {
    this.store.dispatch(DoctorActions.loadDoctor());
    this.DoctorId$ = this.store.pipe(select(selectDoctor));
  
    this.DoctorId$.subscribe((Doctor) => {
      this.doctorId = Doctor?._id;
      if (this.doctorId) {
        console.log("Doctor ID loaded:", this.doctorId);



        this.loadSlots(this.doctorId);
       
      }
    });
  

  }
  selectTime(time:TimeSlot){
    this.selectedTime=time
  }
  

  loadSlots(doctorId:string|undefined) {



    this.doctorslotService.getSlots(this.selectedDay,doctorId).subscribe({
      next: (res: AvailableTimeResponse) => {

        if (res.success) {
          // Display or process slots
          this.selectedTimes = res.slots;
        
        } else {
          this.toasterService.error(res.message);
        }
      },
      error: (err) => {
        this.toasterService.error('Failed to load slots');
      }
    });
  }

  SelectedDay(day: string): void {
    this.selectedDay = day;
    this.loadSlots(this.doctorId )
  }

  AddSlotOpen(): void {
    this.openModal = !this.openModal;
  }


  async handleSave(event: { startTime: string; endTime: string; totalSlots: number }): Promise<void> {
    const slotData = {
      ...event,
      day: this.selectedDay,
    };

    // Split the time range into individual slots
    const slotsArray = this.splitIntoSlots(event.startTime, event.endTime, event.totalSlots);

    // Sort slots by startTime to ensure correct order
    slotsArray.sort((a, b) => this.convertTimeToMinutes(a.startTime) - this.convertTimeToMinutes(b.startTime));

    // Save slots sequentially
    for (const slot of slotsArray) {
      const slotToSave = {
        ...slotData,
        startTime: slot.startTime,
        endTime: slot.endTime,
      };

    



      // Use subscribe() without await
      this.doctorslotService.saveSlotData(slotToSave,this.doctorId).subscribe({
        next: (res) => {
          if (res.success) {
            this.toasterService.success(res.message);
            this.loadSlots(this.doctorId)
          } else {
            this.toasterService.error(res.message);
          }
        },
        error: (error) => {
          console.error('Error saving slot:', slotToSave, error);
        }
      });
    }

    // Close the modal
    this.handleClose();
  }


  handleClose(): void {
    this.openModal = false;
  }



  deleteSlot(_id: string) {
    let data={
      Slotid:_id,
      day:this.selectedDay,
      doctorId:this.doctorId
    }
    this.doctorslotService.deleteSlot(data).subscribe({
      next:(res:commonResponse)=>{
        if(res.success){
          this.selectedTimes=this.selectedTimes.filter((slot)=>slot._id!==data.Slotid)
          this.toasterService.success(res.message)
        }else{
          this.toasterService.error(res.message)
        }

      }
    })
  }


  deleteAll(){
    this.doctorslotService.deleteAllSlots(this.selectedDay,this.doctorId).subscribe({
      next:(res:commonResponse)=>{
        if(res.success){
          this.toasterService.success(res.message)
          window.location.reload()

        }else{
          this.toasterService.error(res.message)

        }
        


      }
    })
  }



  splitIntoSlots(startTime: string, endTime: string, totalSlots: number): Array<{ startTime: string; endTime: string }> {
    const slotsArray = [];
    const startMinutes = this.convertTimeToMinutes(startTime);
    const endMinutes = this.convertTimeToMinutes(endTime);

    // Validate the time range
    if (isNaN(startMinutes) || isNaN(endMinutes) || startMinutes >= endMinutes) {
      this.toasterService.error('Invalid time range: Start time should be earlier than end time.')
    
      return [];
    }

    // Calculate slot duration and ensure it is rounded to the nearest minute
    const slotDuration = Math.floor((endMinutes - startMinutes) / totalSlots);


    for (let i = 0; i < totalSlots; i++) {
      const slotStartMinutes = startMinutes + i * slotDuration;
      const slotEndMinutes = slotStartMinutes + slotDuration;

      // Ensure times do not exceed end time
      if (slotEndMinutes > endMinutes) {
        break;
      }

      slotsArray.push({
        startTime: this.convertMinutesToTime(slotStartMinutes),
        endTime: this.convertMinutesToTime(slotEndMinutes),
      });
    }


    return slotsArray;
  }

 
  convertTimeToMinutes(time: string): number {
    const [timePart, modifier] = time.trim().split(' ');
    const [hours, minutes] = timePart.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 12 || minutes < 0 || minutes >= 60 || !modifier) {
     
      return NaN;
    }
    let adjustedHours = hours;
    if (modifier.toUpperCase() === 'PM' && hours !== 12) {
      adjustedHours += 12;
    } else if (modifier.toUpperCase() === 'AM' && hours === 12) {
      adjustedHours = 0;  // Midnight case (12 AM is 00:00 in 24-hour format)
    }

    // Return time in minutes
    return adjustedHours * 60 + minutes;
  }


  convertMinutesToTime(minutes: number): string {
    if (isNaN(minutes) || minutes < 0) {
      return '00:00';
    }

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins < 10 ? '0' : ''}${mins}`;
  }

}



