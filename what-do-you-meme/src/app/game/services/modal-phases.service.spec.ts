import { TestBed } from '@angular/core/testing';

import { ModalPhasesService } from './modal-phases.service';

describe('ModalPhasesService', () => {
  let service: ModalPhasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalPhasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
