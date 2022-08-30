import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import Bookmark from 'src/app/models/Bookmark';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { BookmarkService } from 'src/app/services/bookmark.service';
import { PostService } from 'src/app/services/post.service';
import { PostComponent } from '../post/post.component';

import { PostFeedPageComponent } from './post-feed-page.component';

describe('PostFeedPageComponent', () => {
  let component: PostFeedPageComponent;
  let fixture: ComponentFixture<PostFeedPageComponent>;
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
  const userList:User[] = [testUser];
  
  const testBookmark:Bookmark ={
    "id": 1,
    "post": testPost,
    "user": testUser
  }
  const testBookmarks: Bookmark[] = [testBookmark]
  const testPostArray: Post[] = [testPost];
  let bmService: BookmarkService;
  let PService:PostService;
  let auth:AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ PostFeedPageComponent ],
      providers: [FormBuilder, BookmarkService, PostService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostFeedPageComponent);
    component = fixture.componentInstance;
    component.posts = testPostArray
    component.loggedInUser = testUser
    component.followList = userList
    component.bookmarkedPosts = testPostArray
    component.allBookmarks  = testBookmarks
    component.followedPosts = testPostArray
    PService = TestBed.inject(PostService);
    bmService = TestBed.inject(BookmarkService)
    auth = TestBed.inject(AuthService)
    spyOn(PService, 'getAllPosts').and.callFake(()=>of(testPostArray))
    spyOn(PService, 'getFollowedPosts').and.callFake(()=>of(testPostArray))
    spyOn(bmService, 'getAllSavedPosts').and.callFake(()=>of(testBookmarks))
    spyOn(auth, 'viewAllUsers').and.callFake(()=>of(testUser))
    fixture.detectChanges();
  });

  it('TestBed should be Truthy', () => {
    expect(TestBed).toBeTruthy();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toggleCreatePost should toggle its boolean', ()=>{
    component.toggleCreatePost();
    expect(component.createPost).toBeTruthy();
  })
  it('toggleFeed should toggle its boolean', ()=>{
    component.toggleFeed();
    expect(component.showBookmarks).toBeTruthy();
  })
  it('toggleFollowedPosts should toggle its boolean', ()=>{
    component.toggleFollowedPosts();
    expect(component.showFollows).toBeFalsy();
  })
  it('viewAll should return list of user',()=>{
    component.viewAll();
    expect(component.users).toBeTruthy();
  })
});
