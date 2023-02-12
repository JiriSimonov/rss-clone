import { Component  } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-joined-users',
  templateUrl: './game-joined-users.component.html',
  styleUrls: ['./game-joined-users.component.scss']
})
export class GameJoinedUsersComponent {
  isClosed: boolean = false;

  constructor(public gameService: GameService) { }

  togglePlayers() {
    this.isClosed = !this.isClosed;
  }
}
