import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {
  gameId: string;


  constructor(private activateRoute: ActivatedRoute, private gameService: GameService) {
    this.gameId = this.activateRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.gameService.getPlayers(this.gameId);
    this.gameService.joinLobbyRequest(this.gameId);

    this.gameService.joinLobbyEvent().subscribe((data: any) => {
      console.log('name');
    });
  }
}
