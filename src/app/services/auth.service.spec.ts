import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    
  });

  
  it('TestBed should be Truthy', () => {
    expect(TestBed).toBeTruthy();
  });
});
