import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSlidebarComponent } from './admin-slidebar.component';

describe('AdminSlidebarComponent', () => {
  let component: AdminSlidebarComponent;
  let fixture: ComponentFixture<AdminSlidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSlidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminSlidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
