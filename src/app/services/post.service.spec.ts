import { TestBed } from '@angular/core/testing';

import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    
  });
 
  it('TestBed should be Truthy', () => {
    expect(TestBed).toBeTruthy();
  });
});
