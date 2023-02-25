import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { GameService } from '../../services/game.service';
import { LobbyRequestsService } from '../../services/lobby-requests.service';

@Component({
  selector: 'app-game-prepare-phase',
  templateUrl: './game-prepare-phase.component.html',
  styleUrls: ['./game-prepare-phase.component.scss']
})
export class GamePreparePhaseComponent implements OnInit {
  gameId: string;
  isOwner: boolean = false;

  constructor(
    private lobbyService: LobbyRequestsService,
    private gameService: GameService,
    activatedRoute: ActivatedRoute,
    private authService: AuthService,
  ) {
    this.gameId = activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.authService.username$.subscribe((username) => {
      if (username) {
        this.gameService.isLobbyOwner(username, this.gameId).subscribe((value) => {
          this.isOwner = value;
        });
      }
    });
  }

  startGame() {
    this.lobbyService.changePhaseRequest(this.gameId);
  }
}
