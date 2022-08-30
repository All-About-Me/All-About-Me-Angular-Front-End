import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';


import { CommentComponent } from './comment.component';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  let tempDate:Date = new Date();
  let tempUser:User = new User(-1,"me@email.com","Me","Myself","1234567890","123 Example St.","Male","","City","State",123,"123");
    
  let tempPostsArray:Post[] = [];
  let tempPost:Post= new Post(-1,"test string","",tempDate,tempUser,tempPostsArray);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      declarations: [ CommentComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    component.inputComment = tempPost;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('TestBed should be Truthy', () => {
    expect(TestBed).toBeTruthy();
  });

  it('submitReply should work', () => {
    let e:MockEvent = new MockEvent;
    component.submitReply(e);
    
    console.log("testing submitReply");

  });

  class MockEvent{
    preventDefault = () =>{
      // do nothing
    }
  }

});

