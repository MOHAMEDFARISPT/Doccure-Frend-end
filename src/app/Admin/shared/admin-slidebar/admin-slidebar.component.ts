import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-slidebar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './admin-slidebar.component.html',
  styleUrl: './admin-slidebar.component.css'
})
export class AdminSlidebarComponent {

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

}
