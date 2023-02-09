import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LobbyModalService {
  public isOpenCreateModal: boolean = false;
  public isOpenJoinModal: boolean = false;

  constructor() {}

  toggleCreateModal() {
    this.isOpenCreateModal = !this.isOpenCreateModal;
  }
  
  toggleJoinModal() {
    this.isOpenJoinModal = !this.isOpenJoinModal;
  }
}
