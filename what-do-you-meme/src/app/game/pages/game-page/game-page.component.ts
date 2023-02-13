import { Location } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router, RoutesRecognized } from '@angular/router';
import { filter } from 'rxjs';
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
    location: Location,
  ) {
    this.gameId = this.activateRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.gameService.joinLobbyRequest(this.gameId);
    this.gameService.getPlayers(this.gameId);

    this.router.events.pipe(
      filter((event) => event instanceof NavigationStart),
    ).subscribe((event: any) => {
      console.log('routed');
    });

  }

  @HostListener('window:beforeunload', ['$event'])
  onUnloadHandler(event: Event) {
    sessionStorage.setItem('url', this.router.url);
  }
}
