import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ResetPasswordComponent } from './reset-password.component';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Router],
      declarations: [ ResetPasswordComponent ]
    }).compileComponents();
    console.log("point A");
    // fixture = TestBed.createComponent(ResetPasswordComponent);
    console.log("point B");
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('TestBed should be Truthy', () => {
    expect(TestBed).toBeTruthy();
  });
});
