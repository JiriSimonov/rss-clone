import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GameCurrentData } from '../../models/game.model';
import { GameService } from '../../services/game.service';
import { LobbyRequestsService } from "../../services/lobby-requests.service";

@Component({
  selector: 'app-game-joined-users',
  templateUrl: './game-joined-users.component.html',
  styleUrls: ['./game-joined-users.component.scss']
})
export class GameJoinedUsersComponent implements OnInit, OnDestroy {
  isClosed: boolean = false;
  players$ = this.gameService.players$;
  isOwner$ = this.gameService.isOwner$;
  private leaveSubs = new Subscription();
  private joinSubs = new Subscription();
  private deleteLobbySubs = new Subscription();
  @Input() gameId: string = '';

  constructor(
    private gameService: GameService,
    private lobbyRequests: LobbyRequestsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.leaveSubs.add(
      this.lobbyRequests.leaveLobbyEvent().subscribe((gameData: GameCurrentData) => {
        this.gameService.changeGameData(gameData);
      })
    );

    this.joinSubs.add(
      this.lobbyRequests.joinLobbyEvent().subscribe((gameData: GameCurrentData) => {
        this.gameService.changeGameData(gameData);
      })
    );

    this.deleteLobbySubs.add(
      this.lobbyRequests.deleteLobbyEvent().subscribe((uuid: string) => {
        if (uuid === this.gameId) {
          this.leaveLobby();
        }
      })
    );
  }

  togglePlayers() {
    this.isClosed = !this.isClosed;
  }

  destroyLobby() {
    this.lobbyRequests.destroyLobbyRequest(this.gameId);
  }

  leaveLobby() {
    this.lobbyRequests.leaveLobbyRequest(this.gameId);
    this.router.navigate(['lobbies'], { replaceUrl: true }).catch();
  }

  ngOnDestroy() {
    this.leaveSubs.unsubscribe();
    this.joinSubs.unsubscribe();
    this.deleteLobbySubs.unsubscribe();
  }
}
