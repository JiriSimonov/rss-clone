import { TestBed } from '@angular/core/testing';

import { GlobalChatService } from './global-chat.service';

describe('GlobalChatService', () => {
  let service: GlobalChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
