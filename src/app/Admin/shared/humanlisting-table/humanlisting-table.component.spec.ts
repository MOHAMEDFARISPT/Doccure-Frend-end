import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanlistingTableComponent } from './humanlisting-table.component';

describe('HumanlistingTableComponent', () => {
  let component: HumanlistingTableComponent;
  let fixture: ComponentFixture<HumanlistingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HumanlistingTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HumanlistingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
