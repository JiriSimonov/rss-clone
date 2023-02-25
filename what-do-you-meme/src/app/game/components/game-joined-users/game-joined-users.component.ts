import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameCurrentData } from '../../models/game.model';
import { GameService } from '../../services/game.service';
import { LobbyRequestsService } from "../../services/lobby-requests.service";

@Component({
  selector: 'app-game-joined-users',
  templateUrl: './game-joined-users.component.html',
  styleUrls: ['./game-joined-users.component.scss']
})
export class GameJoinedUsersComponent implements OnInit {
  isClosed: boolean = false;
  players$ = this.gameService.players$;
  @Input() uuid: string = '';

  constructor(
    private gameService: GameService,
    private lobbyRequests: LobbyRequestsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.lobbyRequests.leaveLobbyEvent().subscribe((gameData: GameCurrentData) => {
      this.gameService.changeGameData(gameData);
    });

    this.lobbyRequests.joinLobbyEvent().subscribe((gameData: GameCurrentData) => {
      this.gameService.changeGameData(gameData);
    });
  }

  togglePlayers() {
    this.isClosed = !this.isClosed;
  }

  leaveLobby() {
    this.lobbyRequests.leaveLobbyRequest(this.uuid);
    this.router.navigate(['lobbies'], {replaceUrl: true}).catch();
  }
}
