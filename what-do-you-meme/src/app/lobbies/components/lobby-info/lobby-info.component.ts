import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {LobbyService} from '../../services/lobby/lobby.service';
import {LobbiesPrivacy, LobbyData} from 'src/app/lobbies/model/lobby-data';
import {MatDialog} from "@angular/material/dialog";
import {LobbyJoinComponent} from "../lobby-join-modal/lobby-join.component";

@Component({
  selector: 'app-lobby-info',
  templateUrl: './lobby-info.component.html',
  styleUrls: ['./lobby-info.component.scss'],
})
export class LobbyInfoComponent {
  @Input() lobby!: LobbyData;

  constructor(
    private router: Router,
    private lobbyService: LobbyService,
    private joinDialog: MatDialog
  ) {
  }

  get isPrivate() {
    return this.lobby?.privacyType === LobbiesPrivacy.private;
  }

  checkPrivate() {
    this.lobbyService.changeUUID(this.lobby.uuid);
    if (this.isPrivate) {
      this.joinDialog.open(LobbyJoinComponent);
    } else {
      if (this.lobby) {
        this.lobbyService.joinLobby(this.lobby, '');
        this.router.navigate([`/game/${this.lobby.uuid}`], {
          replaceUrl: true,
        }).catch();
      }
    }
  }
}
