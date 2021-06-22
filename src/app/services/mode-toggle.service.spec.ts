import { TestBed } from '@angular/core/testing';

import { ModeToggleService } from './mode-toggle.service';

describe('ModeToggleService', () => {
  let service: ModeToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModeToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
