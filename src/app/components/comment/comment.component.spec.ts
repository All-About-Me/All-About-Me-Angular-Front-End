import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { CommentComponent } from './comment.component';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ CommentComponent , TestCommentComponent]
    }).compileComponents();
    console.log("point A");
    fixture = TestBed.createComponent(CommentComponent);
    console.log("point B");
    component = fixture.componentInstance;
    console.log("point C");
    fixture.detectChanges();
    console.log("point D");
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('TestBed should be Truthy', () => {
    expect(TestBed).toBeTruthy();
  });

  @Component({
    selector:`host-component`,
    template:'<TestCommentComponent [input] = "testing"></TestCommentComponent>'

  })
  class TestCommentComponent{}

});
