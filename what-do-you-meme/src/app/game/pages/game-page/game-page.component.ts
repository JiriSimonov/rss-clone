import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameCurrentData, GameStatus } from '../../models/game.model';
import { GameService } from '../../services/game.service';
import { SessionStorageService } from "../../../shared/storage/services/session-storage.service";
import { LobbyRequestsService } from "../../services/lobby-requests.service";
import { MatDialog } from '@angular/material/dialog';
import { GameVotingPhaseComponent } from '../../components/game-voting-phase/game-voting-phase.component';
import { GameVotingResultsPhaseComponent } from '../../components/game-voting-results-phase/game-voting-results-phase.component';
import { distinctUntilChanged, map, Subscription } from 'rxjs';
import { GameChooseSituationPhaseComponent } from '../../components/game-choose-situation-phase/game-choose-situation-phase.component';

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

  constructor(
    public gameService: GameService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private sessionStorage: SessionStorageService,
    private lobbyRequests: LobbyRequestsService,
    private modal: MatDialog,
  ) {
    this.gameId = this.activateRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.lobbyRequests.leaveLobbyRequest(this.gameId);
    this.lobbyRequests.joinLobbyRequest(this.gameId);
    this.sessionStorage.setItem('url', this.router.url.replace('/game/', ''));

    const gameData$ = this.gameService.gameData$.pipe(
      map((gameData: GameCurrentData) => {
        return gameData;
      }),
      distinctUntilChanged(),
    );

    this.gameSubs.add(
      gameData$.subscribe((data) => this.loadPhase(data))
    );

    this.errorSubs.add(
      this.lobbyRequests.errorSocketEvent().subscribe((err) => {
        console.log(err);
      })
    )

    this.changeSubs.add(
      this.lobbyRequests.changePhaseEvent().subscribe((gameData: GameCurrentData) => {
        this.loadPhase(gameData);
      })
    );
  }

  loadPhase(gameData: GameCurrentData) {
    console.log(gameData.phase, gameData);

    switch (gameData.phase) {
      case GameStatus.Prepare:
        this.modal.closeAll();
        break;

      case GameStatus.ChooseSituation:
        this.gameService.changeGameData(gameData);
        this.modal.open(GameChooseSituationPhaseComponent, {
          data: this.gameId,
          disableClose: true,
        });
        break;

      case GameStatus.Situation:
        this.modal.closeAll();
        this.gameService.clearUsedMemes();
        this.gameService.changeGameData(gameData);
        this.gameService.getPlayerCards();
        break;

      case GameStatus.Vote:
        this.modal.open(GameVotingPhaseComponent, {
          data: this.gameId,
          disableClose: true,
        });
        this.gameService.changeGameData(gameData);
        break;

      case GameStatus.Vote_results:
        this.gameService.changeGameData(gameData);
        this.modal.closeAll();
        this.modal.open(GameVotingResultsPhaseComponent, {
          disableClose: true,
          minHeight: '300px',
        });
        break

      case GameStatus.End:
        this.modal.closeAll();
        this.gameService.changeGameData(gameData);
        break;
    }
  }

  ngOnDestroy() {
    this.gameSubs.unsubscribe();
    this.changeSubs.unsubscribe();
    this.errorSubs.unsubscribe();
  }
}
