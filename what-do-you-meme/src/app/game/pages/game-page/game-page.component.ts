import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameCurrentData, GameStatus } from '../../models/game.model';
import { GameService } from '../../services/game.service';
import { ModalPhasesService } from '../../services/modal-phases.service';
import { SessionStorageService } from "../../../shared/storage/services/session-storage.service";
import {LobbyRequestsService} from "../../services/lobby-requests.service";

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {
  gameId: string;

  constructor(
    public gameService: GameService,
    public modalPhasesService: ModalPhasesService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private sessionStorage: SessionStorageService,
    private lobbyRequests: LobbyRequestsService
  ) {
    this.gameId = this.activateRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.sessionStorage.setItem('url', this.router.url.replace('/game/', ''));
    this.lobbyRequests.joinLobbyRequest(this.gameId);

    this.lobbyRequests.changePhaseEvent().subscribe((data: GameCurrentData) => {
      console.log(data.status, data);

      switch (data.status) {
        case GameStatus.Prepare:
          console.log('prepare');
          break;

        case GameStatus.Situation:
          this.gameService.clearUsedMemes();
          this.gameService.changeGameData(data);
          this.gameService.getPlayerCards();
          this.modalPhasesService.closeVotingResultsModal();
          console.log(data);
          break;

        case GameStatus.Vote:
          this.modalPhasesService.openVotingModal();
          this.gameService.changeGameData(data);
          break;

        case GameStatus.Vote_results:
          this.gameService.changeGameData(data);
          console.log(data);
          this.modalPhasesService.closeVotingModal();
          this.modalPhasesService.openVotingResultsModal();
          break

        case GameStatus.End:
          this.modalPhasesService.closeVotingResultsModal();
          this.gameService.changeGameData(data);
          break;
      }
    });

    this.lobbyRequests.errorSocketEvent().subscribe((data) => {
      console.log(data);
    });
  }
}
