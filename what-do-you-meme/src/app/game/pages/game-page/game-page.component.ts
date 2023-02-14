import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {
  gameId: string;


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

   // TODO: make it execute once
    this.router.events.pipe(
      take(1),
      filter((event) => event instanceof NavigationStart),
    ).subscribe((event: any) => {
      console.log('routed');
    });
  }
}
