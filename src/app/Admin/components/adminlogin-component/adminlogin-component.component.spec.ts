import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminloginComponent } from './adminlogin-component.component';

describe('AdminloginComponentComponent', () => {
  let component: AdminloginComponent;
  let fixture: ComponentFixture<AdminloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminloginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
