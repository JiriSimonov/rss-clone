import { Component, OnInit  } from '@angular/core';
import { GameCurrentData } from '../../models/game.model';
import { GameService } from '../../services/game.service';
import {LobbyRequestsService} from "../../services/lobby-requests.service";

@Component({
  selector: 'app-game-joined-users',
  templateUrl: './game-joined-users.component.html',
  styleUrls: ['./game-joined-users.component.scss']
})
export class GameJoinedUsersComponent implements OnInit {
  isClosed: boolean = false;
  players$ = this.gameService.players$;

  constructor(public gameService: GameService, private lobbyRequests: LobbyRequestsService) { }

  ngOnInit() {
    this.lobbyRequests.joinLobbyEvent().subscribe((gameData: GameCurrentData) => {
      console.log('joined');
      console.log(gameData)
      this.gameService.changeGameData(gameData);
    });

    this.lobbyRequests.leaveLobbyEvent().subscribe((gameData: GameCurrentData) => {
      console.log('left');
      this.gameService.changeGameData(gameData);
    });
  }

  togglePlayers() {
    this.isClosed = !this.isClosed;
  }
}
