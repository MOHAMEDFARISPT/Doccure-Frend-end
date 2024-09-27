import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentdetailedComponent } from './appointmentdetailed.component';

describe('AppointmentdetailedComponent', () => {
  let component: AppointmentdetailedComponent;
  let fixture: ComponentFixture<AppointmentdetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentdetailedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointmentdetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
