import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckForgotTokenComponent } from './check-forgot-token.component';

describe('CheckForgotTokenComponent', () => {
  let component: CheckForgotTokenComponent;
  let fixture: ComponentFixture<CheckForgotTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckForgotTokenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckForgotTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
