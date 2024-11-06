import { TestBed } from '@angular/core/testing';

import { FthreadImageService } from './fthread-image.service';

describe('FthreadImageService', () => {
  let service: FthreadImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FthreadImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
