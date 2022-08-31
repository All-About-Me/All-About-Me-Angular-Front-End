import { formatNumber } from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DebugElement } from "@angular/core";
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { FormsModule, NgForm } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import User from "src/app/models/User";
import { ResetPasswordComponent } from "./reset-password.component";

describe("ResetPasswordComponent", () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  const testUser = new User(5,"testuser@gmail.com",'Test','User','','','','','','',8,'password')
  const formdata = <NgForm>{
    value: {
      currentPassword: 'password',
    newPassword: 'pass'
    }
    
  }
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      declarations: [ResetPasswordComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    component.user = testUser;
    fixture.detectChanges();
  });

  it("TestBed should be Truthy", () => {
    expect(TestBed).toBeTruthy();
  });
  it("should be created", () => {
    expect(component).toBeTruthy();
  });

  it('onCall should change password', fakeAsync(()=>{
    component.user = testUser;
    component.onCall(formdata);
    fixture.detectChanges();
    tick();
    expect(component.user.password).toEqual('pass')
  }))

});

