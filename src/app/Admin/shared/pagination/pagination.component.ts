import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-pagination',
    standalone: true,
    imports: [],
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css'], // Ensure this is correct
  })
  export class PaginationComponent  {

    @Input() currentPage:number=1;
    @Input() totalPages:number=1
    @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>(); 


    // Method to trigger when "Previous" button is clicked
  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.pageChanged.emit(this.currentPage - 1); 
    }
  }

      // Method to trigger when "Next" button is clicked
  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.pageChanged.emit(this.currentPage + 1); 
    }
  }


     // Method to trigger when a specific page number is clicked
  goToPage(page: number): void {
    this.pageChanged.emit(page); 
  }


  }