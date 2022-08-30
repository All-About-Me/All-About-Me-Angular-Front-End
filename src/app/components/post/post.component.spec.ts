import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import Bookmark from "src/app/models/Bookmark";
import Post from "src/app/models/Post";
import User from "src/app/models/User";

import { PostComponent } from "./post.component";

describe("PostComponent", () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
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
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [PostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;   
    component.bookmarkList = testPostArray
    component.post =testPost
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });



  it("should switch from not bookmarked to bookmarked when button is clicked", () => {
    component.isBookmarked=false
    component.toggleBookmark()
    expect(component.isBookmarked).toEqual(true)
  });

  it("should switch from bookmarked to not bookmarked when button is clicked", () => {
    component.isBookmarked=true
    component.toggleBookmark()
    expect(component.isBookmarked).toEqual(false)
  });

  


  @Component({
    selector: `host-component`,
    template: `<app-post input="test input"></app-post>`,
  })
  class TestHostComponent {

  } 
  
  });
