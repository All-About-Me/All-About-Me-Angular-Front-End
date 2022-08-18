import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import Bookmark from 'src/app/models/Bookmark';
import Post from 'src/app/models/Post';

import { PostComponent } from './post.component';

describe('PostComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostComponent ]
    })
    .compileComponents();

    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostFixture.detectChanges();
  });

  
  it('should create', () => {
    expect(testHostComponent).toBeTruthy();
  });

  it('TestBed should be Truthy', () => {
    expect(TestBed).toBeTruthy();
  });

  @Component({
    selector: `host-component`,
    template: `<app-post input="test input"></app-post>`
  })
  class TestHostComponent {
    bookmark = new Bookmark(
      28,
      {
          id: 1,
          email: "testuser@gmail.com",
          firstName: "Test",
          lastName: "User",
          phoneNumber: '',
          address: '',
          gender: '',
          aboutMe: ''
      },
      {
          id: 10000,
          text: "The classic",
          imageUrl: "https://i.imgur.com/fhgzVEt.jpeg",
          comments: [],
          author: {
              id: 1,
              email: "testuser@gmail.com",
          firstName: "Test",
          lastName: "User",
          phoneNumber: '',
          address: '',
          gender: '',
          aboutMe: ''
          }
      }
      
    )
    post = new Post(
      10000,
      "The classic",
      "https://i.imgur.com/fhgzVEt.jpeg",
      {
              id: 1,
              email: "testuser@gmail.com",
          firstName: "Test",
          lastName: "User",
          phoneNumber: '',
          address: '',
          gender: '',
          aboutMe: ''
          },
      []
    )
  }
  
  });
