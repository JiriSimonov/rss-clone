import { LobbyModalService } from '../../services/lobby-modal/lobby-modal.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LobbyService } from '../../services/lobby.service';
import { LobbiesPrivate, LobbyData } from 'src/app/shared/model/lobby-data';

@Component({
  selector: 'app-lobby-info',
  templateUrl: './lobby-info.component.html',
  styleUrls: ['./lobby-info.component.scss'],
})
export class LobbyInfoComponent implements OnInit {
  @Input() lobby?: LobbyData;

  constructor(
    private router: Router,
    private lobbyModal: LobbyModalService,
    private lobbyService: LobbyService
  ) {}

  ngOnInit(): void {
  }

  get isPrivate() {
    return this.lobby?.privacyType === LobbiesPrivate.private;
  }

  checkPrivate() {
    if (this.isPrivate) {
      this.lobbyModal.toggleJoinModal();
    } else {
      if (this.lobby) {
        this.lobbyService.joinLobby(this.lobby);
        this.router.navigate([`/game/${this.lobby?.uuid}`], {
          replaceUrl: true,
        });
      }
    }
  }
}
