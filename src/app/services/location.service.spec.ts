import { TestBed } from '@angular/core/testing';

import { LocationService } from './location.service';

describe('LocationService', () => {
  let service: LocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationService);
  });

  it('should get the state list', () => {
    let stateListTest=service.getStates();
    expect(service.states).toEqual(stateListTest)
  });
});
