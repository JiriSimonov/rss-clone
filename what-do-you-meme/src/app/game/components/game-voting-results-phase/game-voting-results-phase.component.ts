import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-voting-results-phase',
  templateUrl: './game-voting-results-phase.component.html',
  styleUrls: ['./game-voting-results-phase.component.scss']
})
export class GameVotingResultsPhaseComponent {
  votes$ = this.gameService.votes$;
  constructor(private gameService: GameService) { }

  getVoteResults(value: number) {
    return value * 50;
  }
}
