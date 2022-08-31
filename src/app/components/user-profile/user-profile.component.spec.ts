import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from '../../services/user.service';
import { UserProfileComponent } from './user-profile.component';
import { environment } from 'src/environments/environment';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let authService:AuthService;
  let userService:UserService;
  let controller: HttpTestingController;
  let expectedUrl:string = `${environment.baseUrl}`;
  const testUser = new User(5,"testuser@gmail.com",'Test','User','','','','','','',8,'password')
  const testUser2 = new User(2,"testuser@gmail.com",'Test','User','','','','','','',8,'password')

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([{ path: "profile-page/:id", component: UserProfileComponent }]), FormsModule],
      declarations: [ UserProfileComponent ],
      providers:[{
        provide: ActivatedRoute,
        useValue: {
          params: of({id: 2})
        }
      }]
    })
    .compileComponents();
    authService =TestBed.inject(AuthService)    
    authService.currentUser=testUser
    userService=TestBed.inject(UserService)
    controller=TestBed.inject(HttpTestingController)
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
  it('should set loggedInUser based on current user', () =>{
    component.ngOnInit();
    expect(component.loggedInUser).toEqual(testUser);
  });
  it('should set user based on activated route', ()=>{
    component.getRouteId();
    component.getUser();
    const request = controller.expectOne((request) => request.url === 
      `${expectedUrl}/user/${testUser2.id}`);
    request.flush(testUser2);
    expect(component.user).toEqual(testUser2);
    controller.verify();
  });
  it('should toggle followList',()=>{
    component.viewFollowing=true;
    component.viewFollowList();
    expect(component.viewFollowing).toBe(false);
    component.viewFollowList();
    expect(component.viewFollowing).toBe(true);
  });
  it('should toggle followerList', ()=>{
    component.viewFollowers=false;
    component.viewFollowerList();
    expect(component.viewFollowers).toBe(true);
    component.viewFollowerList();
    expect(component.viewFollowers).toBe(false);
  });
  it('should check if loggedInUser is following user',()=>{
    component.loggedInUser=testUser;
    component.user=testUser2;
    component.followList=[testUser2];
    expect(component.checkIfFollowing()).toBeTrue();
  });
  it('should follow user',()=>{
    component.loggedInUser=testUser;
    component.user=testUser2;
    component.followUser()
    const request = controller.expectOne(`${expectedUrl}/follower/${testUser.id}/add`);
    expect(request).toBeTruthy();
    controller.verify();
  });
  it('should get FollowList', ()=>{
    component.loggedInUser=testUser;
    component.getFollowing();
    const request = controller.expectOne(`${expectedUrl}/follower/following/${testUser.id}`);
    request.flush([testUser2]);
    
    expect(component.followList).toEqual([testUser2]);
    controller.verify();
  })

 
  @Component({
    selector: "host-component",
    template: `<app-user-profile></app-user-profile>`,
  })
  class HostUserProfileComponent{

  }
});
