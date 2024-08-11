import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdicalRecordDialogComponent } from './mdical-record-dialog.component';

describe('MdicalRecordDialogComponent', () => {
  let component: MdicalRecordDialogComponent;
  let fixture: ComponentFixture<MdicalRecordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MdicalRecordDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MdicalRecordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
