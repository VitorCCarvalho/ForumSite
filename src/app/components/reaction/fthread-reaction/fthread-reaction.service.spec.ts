import { TestBed } from '@angular/core/testing';

import { FthreadReactionService } from './fthread-reaction.service';

describe('FthreadReactionService', () => {
  let service: FthreadReactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FthreadReactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
