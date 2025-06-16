import { TestBed } from '@angular/core/testing';

import { RickMorty } from './rick-morty';

describe('RickMorty', () => {
  let service: RickMorty;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RickMorty);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
