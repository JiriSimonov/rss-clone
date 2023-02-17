import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameCurrentData, GameStatus } from '../../models/game.model';
import { GameService } from '../../services/game.service';
import { ModalPhasesService } from '../../services/modal-phases.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {
  gameId: string;
  isClosed: boolean = false;

  constructor(
    private gameService: GameService,
    public modalPhasesService: ModalPhasesService,
    private activateRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.gameId = this.activateRoute.snapshot.params['id'];
  }

  ngOnInit() {
    sessionStorage.setItem('url', this.router.url);
    this.gameService.joinLobbyRequest(this.gameId);
    console.log(this.gameService.players);


    this.gameService.changePhaseEvent().subscribe((data: GameCurrentData) => {
      console.log(data);

      switch (data.status) {
        case GameStatus.Prepare:
          console.log('prepare');
          break;
        case GameStatus.Situation:
          console.log('situation');
          break;
        case GameStatus.Vote:
          this.modalPhasesService.toggleVotingModal();
          break;
        case GameStatus.Vote_results:
          console.log('vote-results');
          break
        case GameStatus.End:
          console.log('The End D:');
          break;
      }
    });

    this.gameService.errorSocketEvent().subscribe((data) => {
      console.log(data);
    });

    // Move to preload screen with "READY" button later
    // setTimeout(() => {
    //   this.gameService.startGameRequest(this.gameId);
    // }, 30000);
  }
}
