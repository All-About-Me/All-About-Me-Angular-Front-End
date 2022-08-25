import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import Bookmark from "src/app/models/Bookmark";
import Post from "src/app/models/Post";
import User from "src/app/models/User";

import { PostComponent } from "./post.component";

describe("PostComponent", () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostComponent],
    }).compileComponents();

    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostFixture.detectChanges();
  });

  it("should create", () => {
    expect(testHostComponent).toBeTruthy();
  });

  it("TestBed should be Truthy", () => {
    expect(TestBed).toBeTruthy();
  });

  @Component({
    selector: `host-component`,
    template: `<app-post input="test input"></app-post>`,
  })
  class TestHostComponent {

  } 
  
  });
