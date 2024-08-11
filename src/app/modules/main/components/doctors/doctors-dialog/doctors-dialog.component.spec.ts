import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsDialogComponent } from './doctors-dialog.component';

describe('DoctorsDialogComponent', () => {
  let component: DoctorsDialogComponent;
  let fixture: ComponentFixture<DoctorsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoctorsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
