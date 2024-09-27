import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { filter, Observable, take } from 'rxjs';
import { UserModel, user } from '../../../Users/Store/User/userModel';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../Users/Store/User/user.state';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import  * as userAction from '../../../Users/Store/User/user.actions'
import { selectUser } from '../../../Users/Store/User/user.selector';

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
  user$!:Observable<UserModel | null>
  userId!:string | undefined;

  




  constructor(
    private store:Store<AppState>,

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
   
    this.store.dispatch(userAction.loaduser());
    this.user$ = this.store.pipe(select(selectUser));

    this.user$.subscribe((user)=>{
      
      this.userId=user?._id
    

    })
   

    
   
  }



  


   
  
  
 
    
  }


