import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UserCardComponent } from './user-card.component';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ UserCardComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    
  });
  
  it('TestBed should be Truthy', () => {
    expect(TestBed).toBeTruthy();
  });
  it("should be created", () => {
    expect(component).toBeTruthy();
  });
  
});
