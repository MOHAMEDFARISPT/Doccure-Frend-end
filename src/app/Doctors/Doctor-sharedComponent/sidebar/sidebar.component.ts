import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  isSidebarOpen = false;
  activeItem: string = 'Dashboard';
  






  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  handleSidebarItemClick(item: string) {
    this.activeItem = item;
    // Your existing logic for item click
  }

 



  ngOnInit(): void {
  }


   
  
  
 

}
