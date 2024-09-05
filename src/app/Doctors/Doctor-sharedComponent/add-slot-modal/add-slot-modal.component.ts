import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-slot-modal',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './add-slot-modal.component.html',
  styleUrl: './add-slot-modal.component.css'
})
export class AddSlotModalComponent {
  startTime!: string;
  endTime!: string;
  @Output() closeEvent = new EventEmitter<{ startTime: string, endTime: string }>();

constructor(){
  this.startTime = ''; 
  this.endTime = '';  
}



  close(){
    this.closeEvent.emit({ startTime: '', endTime: '' });
  }

  convertTimeTo12HourFormat( time: string): string {
    const [hour, minute] = time.split(':');
    let period = 'AM';
    let adjustedHour = parseInt(hour, 10);
  
    if (adjustedHour >= 12) {
      period = 'PM';
      if (adjustedHour > 12) {
        adjustedHour -= 12;
      }
    } else if (adjustedHour === 0) {
      adjustedHour = 12;
    }
  
    return `${this.pad(adjustedHour)}:${minute} ${period}`;
  }
  
  pad(number: number): string {
      return number < 10 ? '0' + number : number.toString();
    }
  
  saveTimes() {
    const formattedStartTime =this.convertTimeTo12HourFormat(this.startTime);
    const formattedEndTime =this.convertTimeTo12HourFormat(this.endTime);
    this.closeEvent.emit({
      startTime: formattedStartTime,
      endTime: formattedEndTime
    });
   
  }

}
