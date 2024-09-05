import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../Doctor-sharedComponent/sidebar/sidebar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  loginedUser!:string;
  ngOnInit(): void {

    const loginedDoctor=localStorage.getItem('Doctor')

    if(loginedDoctor){
      let parsedData=JSON.parse(loginedDoctor)
      if(parsedData){
        let loginedUsername=parsedData.personalDetails.firstName+' '+parsedData.personalDetails.lastName
    this.loginedUser=loginedUsername
      }
    }

    
  }
 

}
