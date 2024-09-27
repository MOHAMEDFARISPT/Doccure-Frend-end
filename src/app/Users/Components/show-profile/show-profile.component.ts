import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { reload } from 'firebase/auth';
import { loadDoctors } from '../../../GolbalStore/global.action';
import { map, Observable, tap } from 'rxjs';
import { selectAllDoctors } from '../../../GolbalStore/global.selectors';
import { Doctor } from '../../../GolbalStore/global.model';
import { NavbarComponent } from "../../../sharedComponents/Components/navBar/navbar.component";
import { UserSlidebarComponent } from "../../../sharedComponents/Components/user-slidebar/user-slidebar.component";
import { SearchandFiltersComponent } from "../../../sharedComponents/searchand-filters/searchand-filters.component";
import { ActivatedRoute, RouterModule } from '@angular/router';
import { doctorDetails } from '../../../Admin/interfaces/interface';

@Component({
  selector: 'app-show-profile',
  standalone: true,
  imports: [CommonModule, NavbarComponent,RouterModule,UserSlidebarComponent, SearchandFiltersComponent],
  templateUrl: './show-profile.component.html',
  styleUrl: './show-profile.component.css'
})
export class ShowProfileComponent implements OnInit {
  doctors$: Observable<Doctor[]> = this.store.select(selectAllDoctors);
  doctor$!: Observable<Doctor | undefined>;

  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.dispatch(loadDoctors());
      
      this.doctor$ = this.doctors$.pipe(
        map(doctors => doctors.find(doctor => doctor._id === id))
      );

      // Debugging - log the selected doctor
      this.doctor$.pipe(
        tap((doctor: Doctor | undefined) => console.log('Selected Doctor:', doctor))
      ).subscribe();
    } else {
      console.error('No ID found in route parameters');
    }
  }
}
