import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, fromEvent, map } from 'rxjs';
import { LobbyOptions } from '../../models/lobbie-info.model';
import { LobbyService } from '../../services/lobby.service';

@Component({
  selector: 'app-lobbies-page',
  templateUrl: './lobbies-page.component.html',
  styleUrls: ['./lobbies-page.component.scss'],
})
export class LobbiesPageComponent implements OnInit {
  isOpened = false;
  id: string = '1';

  constructor(public lobbiesService: LobbyService, private activateRoute: ActivatedRoute) {
    this.id = this.activateRoute.snapshot.params['id'];
  }

  ngOnInit() {
    // Not sure
    fromEvent<StorageEvent>(window, 'storage').pipe(
      filter(event => event.key === 'createdLobby'),
      filter(event => event.key !== null),
      map((event) => {
        console.log(event.newValue);
        return event.newValue;
      }),
    ).subscribe(key => window.localStorage.setItem('createdLobby', key ?? ''));

    this.lobbiesService.getAllLobbies(+this.id).subscribe();
  }

  toggleModal() {
    this.isOpened = !this.isOpened;
  }

  createLobby(params: LobbyOptions) {
    const body = { ...params, joinedUsers: 1 }
    this.lobbiesService.createNewLobby(body).subscribe();
  }
}
