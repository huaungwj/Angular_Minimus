import { TestBed } from '@angular/core/testing';

import { FbService } from './fb.service';

describe('FbService', () => {
  let service: FbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
