import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LobbyModalService {
  public isOpenCreateModal: boolean = false;
  public isOpenJoinModal: boolean = false;
  currentId?: number;

  constructor() {}

  get currentLobbyId() {
    return this.currentId;
  }

  set currentLobbyId(value: number | undefined) {
    this.currentId = value;
  }

  toggleCreateModal() {
    this.isOpenCreateModal = !this.isOpenCreateModal;
  }
  
  toggleJoinModal() {
    this.isOpenJoinModal = !this.isOpenJoinModal;
  }
}
