import { Component, OnInit } from '@angular/core';
import { LobbyOptions } from '../../models/lobbie-info.model';
import { LobbyService } from '../../services/lobby.service';

@Component({
  selector: 'app-lobbies-page',
  templateUrl: './lobbies-page.component.html',
  styleUrls: ['./lobbies-page.component.scss'],
})
export class LobbiesPageComponent implements OnInit {
  isOpened = false;

  constructor(public lobbiesService: LobbyService) { }

  async ngOnInit() {
    this.lobbiesService.getAllLobbies().subscribe();
    console.log(this.lobbiesService.lobbies);
  }

  toggleModal() {
    this.isOpened = !this.isOpened;
  }

  createLobby(params: any) {
    const body = {...params, joinedUsers: 1 }
    this.lobbiesService.createNewLobby(body).subscribe();
  }
}
