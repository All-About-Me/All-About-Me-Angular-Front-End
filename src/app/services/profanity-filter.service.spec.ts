import { TestBed } from '@angular/core/testing';

import { ProfanityFilterService } from './profanity-filter.service';

describe('ProfanityFilterService', () => {
  let service: ProfanityFilterService;
  const profanityText:string = "words with Pizza";
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfanityFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should detect profanity', ()=>{
    expect(service.validatePost(profanityText).valueOf()).toBeFalse();
  })
});
