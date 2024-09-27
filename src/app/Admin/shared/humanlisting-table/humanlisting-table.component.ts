import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-humanlisting-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './humanlisting-table.component.html',
  styleUrl: './humanlisting-table.component.css'
})
export class HumanlistingTableComponent {

  @Input() tableHeaders: string[] = [];
  @Input() tableData: any[] = [];

}
