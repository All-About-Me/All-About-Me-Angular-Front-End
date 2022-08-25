import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
   
  });

 
  it('TestBed should be Truthy', () => {
    expect(TestBed).toBeTruthy();
  });
});
