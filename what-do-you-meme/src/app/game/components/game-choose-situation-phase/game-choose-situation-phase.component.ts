import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Socket } from 'ngx-socket-io';
import { map, Subscription } from 'rxjs';
import { IoInput, IoOutput } from 'src/app/shared/model/sockets-events';
import { GameCurrentData } from '../../models/game.model';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-choose-situation-phase',
  templateUrl: './game-choose-situation-phase.component.html',
  styleUrls: ['./game-choose-situation-phase.component.scss']
})
export class GameChooseSituationPhaseComponent implements OnInit, OnDestroy {
  situationOptions$ = this.gameService.situationOptions$;
  situations$ = this.gameService.situations$;
  private pickSituationSubs = new Subscription();
  uuid: string;

  constructor(
    private gameService: GameService,
    private socket: Socket,
    @Inject(MAT_DIALOG_DATA) uuid: string,
  ) {
    this.uuid = uuid;
  }

  pickSituation(uuid: string, situation: string) {
    this.socket.emit(IoInput.pickSituationRequest, {
      uuid,
      situation,
    });
  }

  ngOnInit(): void {
    this.pickSituationSubs.add(
      this.gameService.pickSituationEvent().subscribe((gameData: GameCurrentData) => {
        this.gameService.changeGameData(gameData);
      })
    )
  }

  ngOnDestroy(): void {
    this.pickSituationSubs.unsubscribe();
  }
}
