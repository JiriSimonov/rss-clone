import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalPhasesService {
  isOpenedVotingModal: boolean = false;
  isOpenedVotingResultsModal: boolean = false;
  constructor() { }

  //TODO: DRY + Toggle

  closeVotingModal(): void {
    this.isOpenedVotingModal = false;
  }

  openVotingModal(): void {
    this.isOpenedVotingModal = true;
  }

  closeVotingResultsModal(): void {
    this.isOpenedVotingResultsModal = false;
  }

  openVotingResultsModal(): void {
    this.isOpenedVotingResultsModal = true;
  }
}
