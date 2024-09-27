import { Component, OnInit } from '@angular/core';
import { UserSlidebarComponent } from "../../../sharedComponents/Components/user-slidebar/user-slidebar.component";
import { NavbarComponent } from "../../../sharedComponents/Components/navBar/navbar.component";
import { SearchandFiltersComponent } from "../../../sharedComponents/searchand-filters/searchand-filters.component";
import { selectAllDoctors } from '../../../GolbalStore/global.selectors';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Doctor } from '../../../GolbalStore/global.model';
import { Store } from '@ngrx/store';
import { loadDoctors } from '../../../GolbalStore/global.action';
import { UserServicesService } from '../../services/user-services.service';
import { CommonModule } from '@angular/common';
import { ShowProfileComponent } from "../show-profile/show-profile.component";
import { RouterModule } from '@angular/router';
import { CapitalizePipe } from '../../../cemelcase.pipe';
import { SpinnerComponent } from '../../../spinner/spinner/spinner.component';

@Component({
  selector: 'app-doctorslist',
  standalone: true,
  imports: [UserSlidebarComponent,RouterModule,SpinnerComponent,CapitalizePipe,CommonModule, NavbarComponent, SearchandFiltersComponent, ShowProfileComponent],
  templateUrl: './doctorslist.component.html',
  styleUrl: './doctorslist.component.css'
})
export class DoctorslistComponent implements OnInit {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  doctors$: Observable<Doctor[]>;
  filteredDoctors$: Observable<Doctor[]>;
  searchQuery: BehaviorSubject<string> = new BehaviorSubject('');
  genderFilter: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]); // Explicit type <string[]>
  departmentFilter: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]); // Explicit type <string[]>

  constructor(private store: Store) {
    this.doctors$ = this.store.select(selectAllDoctors);

    // Initialize filteredDoctors$ considering all filters
    this.filteredDoctors$ = combineLatest([
      this.doctors$,
      this.searchQuery,
      this.genderFilter,
      this.departmentFilter
    ]).pipe(
      map(([doctors, searchQuery, genderFilter, departmentFilter]) =>
        this.filterDoctors(doctors, searchQuery, genderFilter, departmentFilter)
      )
    );
  }

  ngOnInit(): void {
    this.isLoading$.next(true);
    this.store.dispatch(loadDoctors());
    this.isLoading$.next(false)
   
    
    
  }

  clearSelections(){
    window.location.reload()
  }

  // Update search query
  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input) {
      const searchValue = input.value.trim().toLowerCase();
      this.searchQuery.next(searchValue);
    }
  }

  // Update gender filter
  onGenderChange(selectedGenders: string[]): void {
    this.genderFilter.next(selectedGenders);
  }

  // Update department filter
  onDepartmentChange(selectedDepartments: string[]): void {
    
    this.departmentFilter.next(selectedDepartments);
  }

  private filterDoctors(doctors: Doctor[], query: string, genderFilter: string[], departmentFilter: string[]): Doctor[] {
   
    return doctors.filter(doctor => {
      const matchesSearchQuery =
        !query ||
        doctor.personalDetails.firstName.toLowerCase().includes(query) ||
        doctor.personalDetails.lastName.toLowerCase().includes(query) ||
        doctor.professionalDetails.specialisedDepartment.toLowerCase().includes(query);

      const matchesGender =
        !genderFilter.length || genderFilter.includes(doctor.personalDetails.gender.toLowerCase());

      const matchesDepartment =
        !departmentFilter.length || departmentFilter.includes(doctor.professionalDetails.specialisedDepartment.toLowerCase());
      return matchesSearchQuery && matchesGender && matchesDepartment;
    });
  }
}



