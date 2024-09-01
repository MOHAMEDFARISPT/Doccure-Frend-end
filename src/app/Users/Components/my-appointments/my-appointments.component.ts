import { Component, OnInit } from '@angular/core';
import { UserSlidebarComponent } from '../../../sharedComponents/Components/user-slidebar/user-slidebar.component';
import { NavbarComponent } from '../../../sharedComponents/Components/navBar/navbar.component';
import { FooterComponent } from '../../../sharedComponents/Components/footer/footer.component';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectUser } from '../../Store/User/user.selector';
import { UserModel } from '../../Store/User/userModel';
import { AppState } from '../../Store/User/user.state';
import { SearchandFiltersComponent } from "../../../sharedComponents/searchand-filters/searchand-filters.component";


@Component({
  selector: 'app-my-appointments',
  standalone: true,
  imports: [UserSlidebarComponent, NavbarComponent, FooterComponent, SearchandFiltersComponent],
  templateUrl: './my-appointments.component.html',
  styleUrl: './my-appointments.component.css'
})
export class MyAppointmentsComponent  {


}
