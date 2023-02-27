import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';
import { LobbyRequestsService } from '../../services/lobby-requests.service';

@Component({
  selector: 'app-game-prepare-phase',
  templateUrl: './game-prepare-phase.component.html',
  styleUrls: ['./game-prepare-phase.component.scss']
})
export class GamePreparePhaseComponent {
  gameId: string;
  isOwner$ = this.gameService.isOwner$;

  constructor(
    private lobbyService: LobbyRequestsService,
    private gameService: GameService,
    activatedRoute: ActivatedRoute,
  ) {
    this.gameId = activatedRoute.snapshot.params['id'];
  }

  startGame() {
    this.lobbyService.changePhaseRequest(this.gameId);
  }
}
