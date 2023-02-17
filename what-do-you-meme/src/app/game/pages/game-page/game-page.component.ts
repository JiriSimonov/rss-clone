import { Component, HostListener, OnInit } from '@angular/core';
import {ActivatedRoute, Router, UrlSegment} from '@angular/router';
import { gameLobbyData } from '../../models/game.model';
import { GameService } from '../../services/game.service';
import {SessionStorageService} from "../../../shared/storage/services/session-storage.service";

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
    private sessionStorage: SessionStorageService,
  ) {
    this.gameId = this.activateRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.sessionStorage.setItem('url', this.router.url.replace('/game/', ''));

    this.gameService.joinLobbyRequest(this.gameId);
    this.gameService.getPlayers(this.gameId);

    this.gameService.changePhaseEvent().subscribe((data) => {
      console.log(10923);
    });
  }
}
