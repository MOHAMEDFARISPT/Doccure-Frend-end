import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentSpecialisationComponent } from './department-specialisation.component';

describe('DepartmentSpecialisationComponent', () => {
  let component: DepartmentSpecialisationComponent;
  let fixture: ComponentFixture<DepartmentSpecialisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentSpecialisationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepartmentSpecialisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
