import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel, user } from '../../../Users/Store/User/userModel';
import { Store, select } from '@ngrx/store';
import { selectUser } from '../../../Users/Store/User/user.selector';
import { AppState } from '../../../Users/Store/User/user.state';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-slidebar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './user-slidebar.component.html',
  styleUrl: './user-slidebar.component.css'
})
export class UserSlidebarComponent  implements OnInit{
  isSidebarOpen = false;
  activeItem: string = 'My Appointments';
  user$!: Observable<UserModel | null>;




  constructor(private store:Store<AppState>,
    private router:Router
  ){}

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

  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['/User-login'])


  }

 



  ngOnInit(): void {
  }


   
  
  
 
    
  }


