import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSlidebarComponent } from './user-slidebar.component';

describe('UserSlidebarComponent', () => {
  let component: UserSlidebarComponent;
  let fixture: ComponentFixture<UserSlidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSlidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserSlidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
