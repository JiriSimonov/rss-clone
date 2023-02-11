import { TestBed } from '@angular/core/testing';

import { UserAvatarService } from '../../shared/services/user-avatar.service';

describe('UserAvatarService', () => {
  let service: UserAvatarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAvatarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
