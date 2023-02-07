import { TestBed } from '@angular/core/testing';

import { LobbyGuardGuard } from './lobby-guard.guard';

describe('LobbyGuardGuard', () => {
  let guard: LobbyGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LobbyGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
