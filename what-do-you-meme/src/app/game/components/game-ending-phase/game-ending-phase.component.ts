import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { GameService } from '../../services/game.service';
import { LobbyRequestsService } from '../../services/lobby-requests.service';

@Component({
  selector: 'app-game-ending-phase',
  templateUrl: './game-ending-phase.component.html',
  styleUrls: ['./game-ending-phase.component.scss']
})
export class GameEndingPhaseComponent implements OnInit, OnDestroy {
  @Input() gameId: string = '';
  isOwner$: Observable<boolean> = this.gameService.isOwner$;
  private ownerSubs = new Subscription();

  constructor(
    private lobbyRequestService: LobbyRequestsService,
    private router: Router,
    private gameService: GameService,
  ) { }

  ngOnInit(): void {
    this.ownerSubs.add(
      this.gameService.isUserOwner(this.gameId)
    )
  }

  leaveLobby() {
    this.lobbyRequestService.leaveLobbyRequest(this.gameId);
    this.router.navigate(['lobbies'], { replaceUrl: true }).catch();
  }

  playAgain() {
    this.lobbyRequestService.changePhaseRequest(this.gameId);
  }

  ngOnDestroy(): void {
    this.ownerSubs.unsubscribe();
  }
}
