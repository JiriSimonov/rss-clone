import { TestBed } from '@angular/core/testing';

import { UserGuestGuard } from './user-guest.guard';

describe('UserGuestGuard', () => {
  let guard: UserGuestGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserGuestGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
