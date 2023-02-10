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

  constructor(activateRoute: ActivatedRoute, public gameService: GameService) {
    this.id = activateRoute.snapshot.params['id'];
  }

  rotateMemeCard(index: number, arr: string[] = this.gameService.memes) {
    const middleCard = Math.floor(arr.length / 2);
    return -(middleCard * 15) + index * 15;
  }

  calcDistance(index: number, arr: string[] = this.gameService.memes) {
    return `${(Math.ceil(arr.length / 2) * 50) - index * 50}% -100%`
  }
}
