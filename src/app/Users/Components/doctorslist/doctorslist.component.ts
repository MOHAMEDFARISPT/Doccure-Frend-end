import { Component, OnInit } from '@angular/core';
import { UserSlidebarComponent } from "../../../sharedComponents/Components/user-slidebar/user-slidebar.component";
import { NavbarComponent } from "../../../sharedComponents/Components/navBar/navbar.component";
import { SearchandFiltersComponent } from "../../../sharedComponents/searchand-filters/searchand-filters.component";
import { selectAllDoctors } from '../../../GolbalStore/global.selectors';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Doctor } from '../../../GolbalStore/global.model';
import { Store } from '@ngrx/store';
import { loadDoctors } from '../../../GolbalStore/global.action';
import { UserServicesService } from '../../services/user-services.service';
import { CommonModule } from '@angular/common';
import { ShowProfileComponent } from "../show-profile/show-profile.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-doctorslist',
  standalone: true,
  imports: [UserSlidebarComponent,RouterModule,CommonModule, NavbarComponent, SearchandFiltersComponent, ShowProfileComponent],
  templateUrl: './doctorslist.component.html',
  styleUrl: './doctorslist.component.css'
})
export class DoctorslistComponent implements OnInit {
  doctors$: Observable<Doctor[]>;
  filteredDoctors$: Observable<Doctor[]>;
  searchQuery: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private store: Store) {
    this.doctors$ = this.store.select(selectAllDoctors);

    // Initialize filteredDoctors$ with an empty query
    this.filteredDoctors$ = this.doctors$.pipe(
      map((doctors: Doctor[]) => this.filterDoctors(doctors, ''))
    );
  }

  ngOnInit(): void {
    this.store.dispatch(loadDoctors());

    // Subscribe to search query changes and filter doctors accordingly
    this.searchQuery.subscribe(query => {
      this.filteredDoctors$ = this.doctors$.pipe(
        map((doctors: Doctor[]) => this.filterDoctors(doctors, query))
      );
    });
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input) {
      const searchValue = input.value.trim().toLowerCase(); // Normalize the search value
      this.searchQuery.next(searchValue); // Update the BehaviorSubject
    }
  }

  private filterDoctors(doctors: Doctor[], query: string): Doctor[] {
    if (!query) {
      return doctors;
    }
    return doctors.filter(doctor =>
      doctor.personalDetails.firstName.toLowerCase().includes(query) ||
      doctor.personalDetails.lastName.toLowerCase().includes(query)||
      doctor.professionalDetails.specialisedDepartment.toLowerCase().includes(query)
    );
  }
}


