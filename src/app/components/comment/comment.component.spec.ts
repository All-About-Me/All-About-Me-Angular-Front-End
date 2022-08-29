import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';

import { CommentComponent } from './comment.component';

describe('CommentComponent', () => {
  let component: CommentHostComponent;
  let fixture: ComponentFixture<CommentHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      declarations: [ CommentComponent , CommentHostComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(CommentHostComponent);
    component = fixture.componentInstance;
    component.setInput();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('TestBed should be Truthy', () => {
    expect(TestBed).toBeTruthy();
  });

  @Component({
    selector:`host-component`,
    template:'<app-comment [comment] = "input"></app-comment>'

  })
  class CommentHostComponent{
    input: Post;

    setInput(): void {
      let tempDate = new Date();
      let tempUser = new User(-1,"me@email.com","Me","Myself","1234567890","123 Example St.","Male","","City","State",123,"123");
    
      let tempPosts:Post[] = [];
      this.input= new Post(-1,"test string","",tempDate,tempUser,tempPosts);
      console.log("Generated test input");
    }
  }

});
function constuctor() {
  throw new Error('Function not implemented.');
}

