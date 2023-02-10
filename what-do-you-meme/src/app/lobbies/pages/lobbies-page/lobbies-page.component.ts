import { LocalStorageService } from './../../../shared/storage/services/local-storage/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { LobbyOptions } from '../../models/lobbie-info.model';
import { LobbyModalService } from '../../services/lobby-modal.service';
import { LobbyService } from '../../services/lobby.service';

@Component({
  selector: 'app-lobbies-page',
  templateUrl: './lobbies-page.component.html',
  styleUrls: ['./lobbies-page.component.scss'],
})
export class LobbiesPageComponent implements OnInit {
  throttle = 0;
  distance = 2;

  constructor(
    public lobbiesService: LobbyService,
    private lobbyModal: LobbyModalService,
    private localStorage: LocalStorageService,
  ) {}

  ngOnInit() {
    this.lobbiesService.extractCreateLobby();
    this.lobbiesService.getLobbies(this.lobbiesService.currentPage).subscribe();
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

  createLobby(params: LobbyOptions) {
    const body = { ...params, joinedUsers: 1 };
    this.lobbiesService.createNewLobby(body).subscribe();
    this.lobbyModal.toggleCreateModal();
  }

  onScroll():void {
    this.lobbiesService.getLobbies(++this.lobbiesService.page).subscribe((lobbies) => this.lobbiesService.lobbies.push(...lobbies));
  }
}
