import {LobbyModalService} from '../../services/lobby-modal/lobby-modal.service';
import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {LobbyService} from '../../services/lobby/lobby.service';
import {LobbiesPrivate, LobbyData} from 'src/app/lobbies/model/lobby-data';

@Component({
  selector: 'app-lobby-info',
  templateUrl: './lobby-info.component.html',
  styleUrls: ['./lobby-info.component.scss'],
})
export class LobbyInfoComponent {
  @Input() lobby!: LobbyData;

  constructor(
    private router: Router,
    private lobbyModal: LobbyModalService,
    private lobbyService: LobbyService
  ) {
  }

  get isPrivate() {
    return this.lobby?.privacyType === LobbiesPrivate.private;
  }

  checkPrivate() {
    this.lobbyModal.currentLobbyId(this.lobby.uuid);
    if (this.isPrivate) {
      this.lobbyModal.toggleJoinModal();
    } else {
      if (this.lobby) {
        this.lobbyService.joinLobby(this.lobby);
        this.router.navigate([`/game/${this.lobby.uuid}`], {
          replaceUrl: true,
        }).catch();
      }
    }
  }
}
