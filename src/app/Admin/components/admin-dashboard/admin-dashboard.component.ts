import { Component } from '@angular/core';
import { AdminSlidebarComponent } from '../../shared/admin-slidebar/admin-slidebar.component';
import { HumanlistingTableComponent } from "../../shared/humanlisting-table/humanlisting-table.component";
import { SearchandFiltersComponent } from "../../../sharedComponents/searchand-filters/searchand-filters.component";


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [AdminSlidebarComponent, HumanlistingTableComponent, SearchandFiltersComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

}
