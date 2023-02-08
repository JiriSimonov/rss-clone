import { Component } from '@angular/core';
import { LobbyService } from '../../services/lobby.service';

@Component({
  selector: 'app-lobby-search',
  templateUrl: './lobby-search.component.html',
  styleUrls: ['./lobby-search.component.scss'],
})
export class LobbySearchComponent {
  constructor(private lobbyService: LobbyService) {}

  updateLobbies() {
    this.lobbyService.getAllLobbies().subscribe((lobbies) => {
      this.lobbyService.lobbies = lobbies;
    });
  }
}
