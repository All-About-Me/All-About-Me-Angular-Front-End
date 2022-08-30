import { TestBed } from '@angular/core/testing';

import { ProfanityFilterService } from './profanity-filter.service';

describe('ProfanityFilterService', () => {
  let service: ProfanityFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfanityFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should refuse a banned word', () => {
    let bannedWord:string =service.bannedWords[1]
    let accepted = service.validatePost(bannedWord)
    expect(accepted).toBeFalsy()
  })

  it('should accept a non banned word', () => {
    let nonBannedWord:string ='the quick brown fox jumped over the lazy dog'
    let accepted = service.validatePost(nonBannedWord)
    expect(accepted).toBeTruthy()
  })
});
