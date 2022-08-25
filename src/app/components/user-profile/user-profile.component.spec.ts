import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
  let component: HostUserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      declarations: [ UserProfileComponent ]
    })
    .compileComponents();

    
  });

  it('TestBed should be Truthy', () => {
    expect(TestBed).toBeTruthy();
  });

  @Component({
    selector: "host-component",
    template: `<app-user-profile></app-user-profile>`,
  })
  class HostUserProfileComponent{

  }
});
