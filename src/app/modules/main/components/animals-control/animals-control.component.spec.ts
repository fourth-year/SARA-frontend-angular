import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalsControlComponent } from './animals-control.component';

describe('AnimalsControlComponent', () => {
  let component: AnimalsControlComponent;
  let fixture: ComponentFixture<AnimalsControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimalsControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnimalsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
