import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-voting-phase',
  templateUrl: './game-voting-phase.component.html',
  styleUrls: ['./game-voting-phase.component.scss']
})
export class GameVotingPhaseComponent {
  gameId: string;

  constructor(
    public gameService: GameService,
    activatedRoute: ActivatedRoute
  ) {
    this.gameId = activatedRoute.snapshot.params['id'];
  }
}
