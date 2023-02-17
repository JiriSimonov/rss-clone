import { Component, OnInit  } from '@angular/core';
import { gameLobbyData } from '../../models/game.model';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-joined-users',
  templateUrl: './game-joined-users.component.html',
  styleUrls: ['./game-joined-users.component.scss']
})
export class GameJoinedUsersComponent implements OnInit {
  isClosed: boolean = false;

  constructor(public gameService: GameService) { }

  ngOnInit() {
    this.gameService.joinLobbyEvent().subscribe((players: gameLobbyData['players']) => {
      this.gameService.playersList = players;
    });

    this.gameService.leaveLobbyEvent().subscribe((players: gameLobbyData['players']) => {
      this.gameService.playersList = players;
    });
  }

  togglePlayers() {
    this.isClosed = !this.isClosed;
  }
}
