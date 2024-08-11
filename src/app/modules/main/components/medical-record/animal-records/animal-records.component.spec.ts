import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalRecordsComponent } from './animal-records.component';

describe('AnimalRecordsComponent', () => {
  let component: AnimalRecordsComponent;
  let fixture: ComponentFixture<AnimalRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimalRecordsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnimalRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
