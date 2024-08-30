import { TestBed } from '@angular/core/testing';

import { FthreadService } from './fthread.service';

describe('FthreadService', () => {
  let service: FthreadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FthreadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
