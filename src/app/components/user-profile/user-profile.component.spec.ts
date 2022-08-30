import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let authService:AuthService;
  const testUser = new User(5,"testuser@gmail.com",'Test','User','','','','','','',8,'password')
  const testUser2 = new User(2,"testuser@gmail.com",'Test','User','','','','','','',8,'password')

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      declarations: [ UserProfileComponent ],
      providers:
      [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {params: {id: 2}}
          }
        }
      ]
    })
    .compileComponents();
    authService =TestBed.inject(AuthService)    
    authService.currentUser=testUser
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it('TestBed should be Truthy', () => {
    expect(TestBed).toBeTruthy();
  });

  it('should set the user based on activated route', ()=>{
    component.ngOnInit()
    expect(component.user).toEqual(testUser2);
  })

  it('should set the loggedInUser based on current user', ()=>{
    component.ngOnInit()
    expect(component.loggedInUser).toEqual(testUser);
  })

  @Component({
    selector: "host-component",
    template: `<app-user-profile></app-user-profile>`,
  })
  class HostUserProfileComponent{

  }
});
