import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

import { UserCardComponent } from './user-card.component';


describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;
  let authService:AuthService;
  const testUser = new User(5,"testuser@gmail.com",'Test','User','','','','','','',8,'password')


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ UserCardComponent ],
      providers: [AuthService]
    })
    .compileComponents();
    authService =TestBed.inject(AuthService)    
    authService.currentUser=testUser
    fixture = TestBed.createComponent(UserCardComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });
  
  it('TestBed should be Truthy', () => {
    expect(TestBed).toBeTruthy();
  });
  it("should be created", () => {
    expect(component).toBeTruthy();
  });

  it('should set the user based on current user', ()=> {
    
    component.ngOnInit()

    expect(component.user).toEqual(testUser)
    

  })
  

});
