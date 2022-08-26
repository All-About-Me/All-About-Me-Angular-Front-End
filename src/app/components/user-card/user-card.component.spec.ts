import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UserCardComponent } from './user-card.component';

describe('UserCardComponent', () => {
  let component: HostUserCardComponent;
  let fixture: ComponentFixture<HostUserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ UserCardComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(HostUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });
  
  it('TestBed should be Truthy', () => {
    expect(TestBed).toBeTruthy();
  });
  it("should be created", () => {
    expect(component).toBeTruthy();
  });
  
  @Component({
    selector: `host-component`,
    template:`<app-user-card></app-user-card>`
  })
  class HostUserCardComponent{}

});
