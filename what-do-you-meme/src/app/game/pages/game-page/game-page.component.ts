import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameCurrentData, GameStatus } from '../../models/game.model';
import { GameService } from '../../services/game.service';
import { SessionStorageService } from "../../../shared/storage/services/session-storage.service";
import { LobbyRequestsService } from "../../services/lobby-requests.service";
import { MatDialog } from '@angular/material/dialog';
import { GameVotingPhaseComponent } from '../../components/game-voting-phase/game-voting-phase.component';
import { GameVotingResultsPhaseComponent } from '../../components/game-voting-results-phase/game-voting-results-phase.component';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {
  gameId: string;

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
    this.sessionStorage.setItem('url', this.router.url.replace('/game/', ''));

    this.lobbyRequests.joinLobbyEvent().subscribe((gameData: GameCurrentData) => {
      this.loadPhase(gameData);
      this.gameService.changeGameData(gameData);
    });

    this.lobbyRequests.joinLobbyRequest(this.gameId);

    this.lobbyRequests.changePhaseEvent().subscribe((gameData: GameCurrentData) => {
      this.loadPhase(gameData);
    });

    this.lobbyRequests.errorSocketEvent().subscribe((err) => {
      console.log(err);
    });
  }

  loadPhase(gameData: GameCurrentData) {
    console.log(gameData.status, gameData);

    switch (gameData.status) {
      case GameStatus.Prepare:
        console.log('prepare');
        break;

      case GameStatus.Situation:
        this.gameService.clearUsedMemes();
        this.gameService.changeGameData(gameData);
        this.gameService.getPlayerCards();
        this.modal.closeAll();
        console.log(gameData);
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
}
