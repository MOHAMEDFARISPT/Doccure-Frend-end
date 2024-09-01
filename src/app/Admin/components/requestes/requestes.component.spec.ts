import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestesComponent } from './requestes.component';

describe('RequestesComponent', () => {
  let component: RequestesComponent;
  let fixture: ComponentFixture<RequestesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
