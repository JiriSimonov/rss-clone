import { LobbyService } from 'src/app/lobbies/services/lobby.service';
import { LocalStorageService } from './../../../shared/storage/services/local-storage/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { LobbyModalService } from '../../services/lobby-modal/lobby-modal.service';

@Component({
  selector: 'app-lobbies-page',
  templateUrl: './lobbies-page.component.html',
  styleUrls: ['./lobbies-page.component.scss'],
})
export class LobbiesPageComponent implements OnInit {
  throttle = 0;
  distance = 2;
  lobbies$ = this.lobbiesService.lobbies$ 

  constructor(
    private lobbiesService: LobbyService,
    private lobbyModal: LobbyModalService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit() {
    this.lobbiesService.extractCreateLobby();
    this.lobbiesService.getInitialLobbiesList();
  }

  get isCreatedLobby() {
    return this.localStorage.getItem('createdLobby') === 'true';
  }

  get createModalState() {
    return this.lobbyModal.isOpenCreateModal;
  }

  get joinModalState() {
    return this.lobbyModal.isOpenJoinModal;
  }

  changeCreateModalState() {
    this.lobbyModal.toggleCreateModal();
  }

  createLobby() {
    this.lobbyModal.toggleCreateModal();
  }

  onScroll(): void {
    this.lobbiesService.incrementPage()
    this.lobbiesService.updateLobbiesList();
  }
}
