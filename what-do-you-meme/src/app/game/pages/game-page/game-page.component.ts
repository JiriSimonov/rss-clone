import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameCurrentData, GameStatus } from '../../models/game.model';
import { GameService } from '../../services/game.service';
import { SessionStorageService } from "../../../shared/storage/services/session-storage.service";
import { LobbyRequestsService } from "../../services/lobby-requests.service";
import { MatDialog } from '@angular/material/dialog';
import { GameVotingPhaseComponent } from '../../components/game-voting-phase/game-voting-phase.component';
import { GameVotingResultsPhaseComponent } from '../../components/game-voting-results-phase/game-voting-results-phase.component';
import { distinctUntilChanged, first, map, Subscription, take } from 'rxjs';
import { GameChooseSituationPhaseComponent } from '../../components/game-choose-situation-phase/game-choose-situation-phase.component';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit, OnDestroy {
  gameId: string;
  private gameSubs = new Subscription();
  private errorSubs = new Subscription();
  private changeSubs = new Subscription();
  private ownerSubs = new Subscription();
  private connectSubs = new Subscription();
  public gameData$ = this.gameService.gameData$;

  constructor(
    public gameService: GameService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private sessionStorage: SessionStorageService,
    private lobbyRequests: LobbyRequestsService,
    private modal: MatDialog,
    private socket: Socket,
  ) {
    this.gameId = this.activateRoute.snapshot.params['id'];
  }

  ngOnInit() {
    if (!SessionStorageService.previousGameUrl) {
      this.lobbyRequests.leaveLobbyRequest(this.gameId);
    }

    this.lobbyRequests.joinLobbyRequest(this.gameId);

    this.connectSubs.add(
      this.socket.fromEvent('connect').subscribe(() => {
        this.lobbyRequests.joinLobbyRequest(this.gameId);
      })
    )

    this.ownerSubs.add(
      this.gameService.isUserOwner(this.gameId)
    );

    this.gameSubs.add(
      this.gameData$.subscribe((data) => {
        this.loadPhase(data);
      }),
    );

    this.sessionStorage.setItem('url', this.router.url.replace('/game/', ''));
    this.errorSubs.add(
      this.lobbyRequests.errorSocketEvent().subscribe((err) => {
        console.log(err);
      })
    )

    this.changeSubs.add(
      this.lobbyRequests.changePhaseEvent().subscribe((gameData: GameCurrentData) => {
        this.connectSubs.unsubscribe();
        this.gameSubs.unsubscribe();
        this.loadPhase(gameData);
      })
    );
  }

  loadPhase(gameData: GameCurrentData) {
    this.modal.closeAll();
    this.gameService.changeGameData(gameData);

    switch (gameData.phase) {
      case GameStatus.ChooseSituation:
        this.modal.open(GameChooseSituationPhaseComponent, {
          data: this.gameId,
          disableClose: true,
        });
        break;

      case GameStatus.Situation:
        this.gameService.clearUsedMemes();
        this.gameService.getPlayerCards();
        break;

      case GameStatus.Vote:
        this.modal.open(GameVotingPhaseComponent, {
          data: this.gameId,
          disableClose: true,
        });
        break;

      case GameStatus.Vote_results:
        this.modal.open(GameVotingResultsPhaseComponent, {
          disableClose: true,
          minHeight: '300px',
        });
        break

      case GameStatus.End:
        this.modal.closeAll();
    }
  }

  ngOnDestroy() {
    this.gameSubs.unsubscribe();
    this.changeSubs.unsubscribe();
    this.errorSubs.unsubscribe();
    this.ownerSubs.unsubscribe();
    this.connectSubs.unsubscribe();
  }
}
