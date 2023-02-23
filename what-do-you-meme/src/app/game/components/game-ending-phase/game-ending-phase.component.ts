import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LobbyRequestsService } from '../../services/lobby-requests.service';

@Component({
  selector: 'app-game-ending-phase',
  templateUrl: './game-ending-phase.component.html',
  styleUrls: ['./game-ending-phase.component.scss']
})
export class GameEndingPhaseComponent {
  @Input() gameId: string = '';

  constructor(private lobbyRequestService: LobbyRequestsService, private router: Router) { }

  leaveLobby() {
    console.log(this.gameId);
    this.lobbyRequestService.leaveLobbyRequest(this.gameId);
    this.router.navigate(['lobbies'], { replaceUrl: true }).catch();
  }
}
