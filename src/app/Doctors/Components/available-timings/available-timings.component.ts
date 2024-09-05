import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../Doctor-sharedComponent/sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddSlotModalComponent } from "../../Doctor-sharedComponent/add-slot-modal/add-slot-modal.component";
import { initFlowbite } from 'flowbite';


@Component({
  selector: 'app-available-timings',
  standalone: true,
  imports: [SidebarComponent, CommonModule, ReactiveFormsModule, FormsModule, AddSlotModalComponent],
  templateUrl: './available-timings.component.html',
  styleUrls: ['./available-timings.component.css']
})
export class AvailableTimingsComponent implements OnInit{
  selectedDay: string = 'Monday';
  selectedTimes: { startTime: string,endTime:string } | null = null;
  openModal:boolean=false

  ngOnInit(): void {
    initFlowbite();

  }
  SelectedDay(day: string): void {
    this.selectedDay = day;
  }

  AddSlotOpen(){
    this.openModal=!this.openModal

  }
  handleClose(event: { startTime: string, endTime: string }) {
    this.selectedTimes = event;
    this.openModal = false;
   
  }
}

