import { TestBed } from '@angular/core/testing';

import { CollectServiceService } from './collect-service.service';

describe('CollectServiceService', () => {
  let service: CollectServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
