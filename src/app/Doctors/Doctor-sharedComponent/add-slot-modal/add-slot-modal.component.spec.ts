import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSlotModalComponent } from './add-slot-modal.component';

describe('AddSlotModalComponent', () => {
  let component: AddSlotModalComponent;
  let fixture: ComponentFixture<AddSlotModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSlotModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSlotModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
