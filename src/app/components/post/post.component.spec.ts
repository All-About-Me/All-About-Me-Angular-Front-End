import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Component, SimpleChange } from "@angular/core";
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import Bookmark from "src/app/models/Bookmark";
import Post from "src/app/models/Post";
import User from "src/app/models/User";
import { Location } from "@angular/common";
import { of } from 'rxjs';

import { PostComponent } from "./post.component";
import { PostService } from "src/app/services/post.service";

describe("PostComponent", () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let location: Location;
  let router:Router;
  let pservice:PostService;
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
        {path:'profile-page/5', component:PostComponent}
      ])],
      declarations: [PostComponent],
    }).compileComponents();
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    pservice = TestBed.inject(PostService);
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    component.bookmarkList = testPostArray
    component.post =testPost
    spyOn(pservice, 'upsertPost').and.callFake(()=>of(testPost))
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it('TestBed should be Truthy', () => {
    expect(TestBed).toBeTruthy();
  });

  it("should switch from not bookmarked to bookmarked when button is clicked", () => {
    component.isBookmarked=false
    component.toggleBookmark()
    expect(component.isBookmarked).toEqual(true)
  });

  it("should switch from bookmarked to not bookmarked when button is clicked", () => {
    component.isBookmarked=true
    component.toggleBookmark()
    expect(component.isBookmarked).toEqual(false);
  });

  it('view profile should take you to profile', fakeAsync(() =>{
    component.viewProfile();
    tick();
    expect(location.path()).toBe('/profile-page/5')
  }));

  it('toggleReplyToPost should change to opposite boolean', ()=>{
    component.replyToPost=true
    component.toggleReplyToPost();
    expect(component.replyToPost).toBeFalsy();
  })

  it('submitReply should submit', ()=>{
    component.submitReply(new Event('click'))
    expect(component.replyToPost).toBeTruthy();
  })

  @Component({
    selector: `host-component`,
    template: `<app-post input="test input"></app-post>`,
  })
  class TestHostComponent {

  } 
  
  });
