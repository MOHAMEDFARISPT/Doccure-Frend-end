import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-slot-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './add-slot-modal.component.html',
  styleUrls: ['./add-slot-modal.component.css']
})
export class AddSlotModalComponent {
  constructor(private notificationService: ToastrService) { }

  @Output() closeModal = new EventEmitter<void>();
  @Output() submitTime = new EventEmitter<{ startTime: string, endTime: string, totalSlots: number }>();

  startTime: string = '';
  endTime: string = '';
  timePeriod: number = 0;
  totalSlots: number = 0;

  // Close the modal
  close(): void {
    this.closeModal.emit();
  }

  // Submit form data
  submit(): void {

    if (this.startTime && this.endTime && this.timePeriod > 0) {
      // Calculate total slots
      this.totalSlots = this.calculateTotalSlots(this.startTime, this.endTime, this.timePeriod);

      // Emit the data to the parent component
      this.submitTime.emit({
        startTime: this.formatTime(this.startTime),
        endTime: this.formatTime(this.endTime),
        totalSlots: this.totalSlots
      });

      // Close the modal
      this.close();
    } else {
      this.notificationService.error("Please ensure all fields are valid.");
    }
  }

  // Helper function to calculate total slots
  calculateTotalSlots(startTime: string, endTime: string, timePeriod: number): number {
    const start = this.convertTimeToMinutes(startTime);
    const end = this.convertTimeToMinutes(endTime);
    const totalMinutes = end - start;

    if (totalMinutes > 0 && timePeriod > 0) {
      return Math.floor(totalMinutes / timePeriod);
    } else {
      return 0;
    }
  }

  // Convert HH:MM format time to total minutes
  convertTimeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  // Format time to 12-hour format with AM/PM
  formatTime(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const adjustedHours = hours % 12 || 12;
    return `${adjustedHours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
  }
}

