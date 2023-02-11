import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent {
  id: string;

  constructor(activateRoute: ActivatedRoute, gameService: GameService) {
    this.id = activateRoute.snapshot.params['id'];
    gameService.getMemes().subscribe();
  }
}
