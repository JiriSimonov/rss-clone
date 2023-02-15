import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { gameLobbyData, GamePlayer } from '../../models/game.model';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {
  gameId: string;
  isClosed: boolean = false;

  constructor(
    private activateRoute: ActivatedRoute,
    private gameService: GameService,
    private router: Router,
  ) {
    this.gameId = this.activateRoute.snapshot.params['id'];
  }

  ngOnInit() {
    sessionStorage.setItem('url', this.router.url);
    this.gameService.joinLobbyRequest(this.gameId);
    this.gameService.getPlayers(this.gameId);

    this.gameService.leaveLobbyEvent().subscribe((players: gameLobbyData['players']) => {
      this.gameService.players = Object.values(players);
    });
  }

  @HostListener('window:beforeunload')
  onBeforeUnload() {
    if (document.visibilityState === 'hidden') {

    }
  }

  @HostListener('window:unload')
  onUnload() {
  }
}
