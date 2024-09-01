import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegistercomponentComponent } from './admin-registercomponent.component';

describe('AdminRegistercomponentComponent', () => {
  let component: AdminRegistercomponentComponent;
  let fixture: ComponentFixture<AdminRegistercomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRegistercomponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminRegistercomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
