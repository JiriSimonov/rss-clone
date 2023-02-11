import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent {
  gameId: string;

  constructor(private activateRoute: ActivatedRoute) {
     this.gameId = this.activateRoute.snapshot.params['id'];
  }
}
