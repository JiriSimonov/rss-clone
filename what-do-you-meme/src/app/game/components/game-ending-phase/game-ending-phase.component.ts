import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { LobbyRequestsService } from '../../services/lobby-requests.service';

@Component({
  selector: 'app-game-ending-phase',
  templateUrl: './game-ending-phase.component.html',
  styleUrls: ['./game-ending-phase.component.scss']
})
export class GameEndingPhaseComponent {
  @Input() gameId: string = '';
  isOwner$ = this.gameService.isOwner$;

  constructor(
    private lobbyRequestService: LobbyRequestsService,
    private router: Router,
    private gameService: GameService,
  ) { }

  leaveLobby() {
    this.lobbyRequestService.leaveLobbyRequest(this.gameId);
    this.router.navigate(['lobbies'], { replaceUrl: true }).catch();
  }

  playAgain() {
    this.lobbyRequestService.changePhaseRequest(this.gameId);
  }
}
