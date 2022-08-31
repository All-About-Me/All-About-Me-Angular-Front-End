import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatMenuModule } from '@angular/material/menu';
import { NavbarComponent } from './navbar.component';
import User from 'src/app/models/User';
import Bookmark from 'src/app/models/Bookmark';
import Post from 'src/app/models/Post';
import {Location} from '@angular/common'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { of } from 'rxjs';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let location:Location;
  let router:Router;
  let auth:AuthService;
  const testUser = new User(5,"testuser@gmail.com",'Test','User','','','','','','',8,'password')
  const dateNow = new Date();
  const testPost ={
    "id": 10001,
    "text": "Lorem ipsum",
    "imageUrl": "",
    "date": dateNow,
    "comments": [],
    "author": testUser
  }
  
  const testBookmark:Bookmark ={
    "id": 1,
    "post": testPost,
    "user": testUser
  }
  const testPostArray: Post[] = [testPost];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([
        {path:'login', component:NavbarComponent},
        {path:'profile-page/5', component:NavbarComponent}
      ]), MatMenuModule],      
      declarations: [ NavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
    auth = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    component.user = testUser;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('TestBed should be Truthy', () => {
    expect(TestBed).toBeTruthy();
  });

  it('logout should take to login screen', fakeAsync(()=>{
    component.logout();
    fixture.detectChanges();
    tick();
    expect(location.path()).toBe('/login')
  }));

  it('ViewProfile should view profile of current user', fakeAsync(()=>{
    auth.currentUser = testUser;
    component.viewProfile();
    fixture.detectChanges();
    tick();
    expect(location.path()).toBe('/profile-page/5')
  }));
});
