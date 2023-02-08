import { Component } from '@angular/core';
import { LobbyService } from '../../services/lobby.service';

@Component({
  selector: 'app-lobbies-pagination',
  templateUrl: './lobbies-pagination.component.html',
  styleUrls: ['./lobbies-pagination.component.scss'],
})
export class LobbiesPaginationComponent {
  constructor(private lobbyService: LobbyService) {}

  updateLobbiesPagination(page: number) {
    console.log(page);
    
    // this.lobbyService.getLobbiesPage(page).subscribe();
  }
}
