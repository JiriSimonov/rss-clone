import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-voting-phase',
  templateUrl: './game-voting-phase.component.html',
  styleUrls: ['./game-voting-phase.component.scss']
})
export class GameVotingPhaseComponent {
  memes$ = this.gameService.memes$;
  uuid: string;

  constructor(
    private gameService: GameService,
    @Inject(MAT_DIALOG_DATA) uuid: string
  ) {
    this.uuid = uuid;
  }

  sendVote(uuid: string, vote: string) {
    this.gameService.sendVote(uuid, vote);
  }
}
