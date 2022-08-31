import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import Like from 'src/app/models/Like';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { LikeService } from 'src/app/services/like.service';

import { LikeComponent } from './like.component';

describe('LikeComponent', () => {
  let component: LikeComponent;
  let fixture: ComponentFixture<TestComponentWrapper>;
  let likeS:LikeService;
  let auth:AuthService;
  const testUser = new User(5,"testuser@gmail.com",'Test','User','','','','','','',8,'password');
  const testUser2 = new User(6,"testuser2@gmail.com",'Test','User','','','','','','',8,'password');
  const dateNow = new Date();
  const testPost ={
    "id": 10001,
    "text": "Lorem ipsum",
    "imageUrl": "",
    "date": dateNow,
    "comments": [],
    "author": testUser
  };
  const testLike = new Like(4,testUser,testPost);
  const likeArray:Like[]= [testLike];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestComponentWrapper, LikeComponent ],
      imports:[HttpClientTestingModule],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestComponentWrapper);
    likeS = TestBed.inject(LikeService);
    auth = TestBed.inject(AuthService);
    component = fixture.debugElement.children[0].componentInstance;
    spyOn(likeS,'getAllMyLikes').and.returnValue(likeArray)
    likeS.likesForUser = likeArray;
    auth.currentUser = testUser2;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('likePost should add a like', ()=>{
    let temp = component.likeCount + 1;
    component.likeList = likeArray;
    component.likePost();
    fixture.detectChanges();
    expect(component.likeCount).toEqual(temp);

  });

  it('unlikePost should remove a like', ()=>{
    let temp = component.likeCount - 1;
    component.likeList = likeArray;
    component.unlikePost();
    fixture.detectChanges();
    expect(component.likeCount).toEqual(temp);

  });

});
@Component({
  selector: 'test-component-wrapper',
  template: '<app-like [post]="post"></app-like>'
})
class TestComponentWrapper {
  
  user = new User(6,"testuser@gmail.com",'Test','User','','','','','','',8,'password');
  dateNow = new Date();
  post ={
    "id": 10001,
    "text": "Lorem ipsum",
    "imageUrl": "",
    "date": this.dateNow,
    "comments": [],
    "author": this.user
  };
}

