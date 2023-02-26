import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { GameService } from '../../services/game.service';
import { LobbyRequestsService } from '../../services/lobby-requests.service';

@Component({
  selector: 'app-game-prepare-phase',
  templateUrl: './game-prepare-phase.component.html',
  styleUrls: ['./game-prepare-phase.component.scss']
})
export class GamePreparePhaseComponent implements OnInit, OnDestroy {
  gameId: string;
  isOwner$: Observable<boolean> = this.gameService.isOwner$;
  private ownerSubs = new Subscription();

  constructor(
    private lobbyService: LobbyRequestsService,
    private gameService: GameService,
    activatedRoute: ActivatedRoute,
  ) {
    this.gameId = activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.ownerSubs.add(
      this.gameService.isUserOwner(this.gameId)
    )

  }

  startGame() {
    this.lobbyService.changePhaseRequest(this.gameId);
  }

  ngOnDestroy(): void {
    this.ownerSubs.unsubscribe();
  }
}
