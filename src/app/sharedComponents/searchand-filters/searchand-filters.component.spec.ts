import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchandFiltersComponent } from './searchand-filters.component';

describe('SearchandFiltersComponent', () => {
  let component: SearchandFiltersComponent;
  let fixture: ComponentFixture<SearchandFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchandFiltersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchandFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
