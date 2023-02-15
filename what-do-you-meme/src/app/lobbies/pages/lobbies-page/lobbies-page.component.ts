import { LobbyValidatorsService } from './../../services/lobby-validators/lobby-validators.service';
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
  scrollUpDistance = 4;
  scrollDistance = 2;
  throttle = 0;
  lobbies$ = this.lobbiesService.lobbies$;
  isCreatedLobby!: boolean;

  constructor(
    private lobbiesService: LobbyService,
    private lobbyModal: LobbyModalService,
    private localStorage: LocalStorageService,
    private lobbyValidators: LobbyValidatorsService
  ) {}

  ngOnInit() {
    this.checkCreatedLobby();
    this.lobbiesService.resetPrivacy();
    this.lobbiesService.getNewLobbiesList();
  }

  checkCreatedLobby() {
    this.lobbyValidators
      .isUserCreatedLobby(LocalStorageService.username)
      .subscribe((response) => {
        this.isCreatedLobby = response;
        this.localStorage.setItem('createdLobby', response);
      });
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

  onScrollDown() {
    this.lobbiesService.incrementPage();
    this.lobbiesService.getLobbiesList();
  }

  onScrollUp() {
    this.lobbiesService.decrementPage();
    this.lobbiesService.getLobbiesList();
  }
}
