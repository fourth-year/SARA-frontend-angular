import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorWorkingHoursComponent } from './doctor-working-hours.component';

describe('DoctorWorkingHoursComponent', () => {
  let component: DoctorWorkingHoursComponent;
  let fixture: ComponentFixture<DoctorWorkingHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoctorWorkingHoursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorWorkingHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
