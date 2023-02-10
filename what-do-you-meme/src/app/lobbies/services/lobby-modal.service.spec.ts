import { TestBed } from '@angular/core/testing';

import { LobbyModalService } from './lobby-modal.service';

describe('LobbyModalService', () => {
  let service: LobbyModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LobbyModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
