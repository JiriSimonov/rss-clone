import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalPhasesService {
  isOpenedVotingModal: boolean = false;
  constructor() { }

  toggleVotingModal(): void {
    this.isOpenedVotingModal = !this.isOpenedVotingModal;
  }
}
