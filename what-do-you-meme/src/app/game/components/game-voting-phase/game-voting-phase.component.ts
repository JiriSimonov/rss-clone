import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-voting-phase',
  templateUrl: './game-voting-phase.component.html',
  styleUrls: ['./game-voting-phase.component.scss']
})
export class GameVotingPhaseComponent {
  uuid: string;
  memes$ = this.gameService.memes$;

  constructor(
    private gameService: GameService,
    activatedRoute: ActivatedRoute
  ) {
    this.uuid = activatedRoute.snapshot.params['id'];
  }

  sendVote(uuid: string, vote: string) {
    this.gameService.sendVote(uuid, vote);
  }
}
