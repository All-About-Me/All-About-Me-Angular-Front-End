import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

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
    template:'<app-component [input] = "testing"></app-component>'

  })
  class CommentHostComponent{}

});
