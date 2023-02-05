import { TestBed } from '@angular/core/testing';

import { IsValidIdGuard } from './is-valid-id.guard';

describe('IsValidIdGuard', () => {
  let guard: IsValidIdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsValidIdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
