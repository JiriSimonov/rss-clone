import { Router } from '@angular/router';
import { LocalStorageService } from './../../shared/storage/services/local-storage/local-storage.service';
import { Injectable } from '@angular/core';
import { filter, fromEvent, map, Observable, tap } from 'rxjs';
import { LobbyOptions, LobbyState } from '../models/lobbie-info.model';
import { LobbyModalService } from './lobby-modal/lobby-modal.service';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class LobbyService {
  public lobbies: [] = [];
  public page = 1;

  constructor(
    private localStorage: LocalStorageService,
    private lobbyModal: LobbyModalService,
    private socket: Socket,
    private router: Router
  ) {}

  joinLobby(data: LobbyState) {
    this.socket.emit('joinRoom', data, (data: any) => {
      console.log(data);
    });
  }

  createLobby(options: LobbyOptions) {
    this.socket.emit(
      'createLobbyRequest',
      { lobby: options },
      (data: LobbyState) => {
        this.joinLobby(data);
        this.router.navigate([`/game/${data.uuid}`], { replaceUrl: true });
      }
    );
  }

  //TODO описать интерфейс лоббей

  get currentPage(): number {
    return this.page;
  }

  // getLobbies(page: number): Observable<LobbyInfo[]> {
  //   return this.http.get<LobbyInfo[]>(`${this.URL}?_page=${page}&per_page=5`);
  // }

  getLobby(uuid: string) {
    this.socket.emit('getLobbyData', uuid, (data: any) => {
      console.log(data);
    });
  }

  // getLobbyByName(name: string) {
  //   return this.http.get(`${this.URL}/${name}`);
  // } // TODO

  // createNewLobby(lobby: LobbyInfo) {
  //   return this.http.post<LobbyInfo>(this.URL, lobby).pipe(
  //     tap((lobby) => {
  //       this.router.navigate([`/game/${lobby.id}`], { replaceUrl: true });
  //     })
  //   );
  // }

  // isValidPassword(password: string) {
  //   return this.http.get(`${this.URL}/${password}`);
  // }

  // deleteLobby(id: string): Observable<LobbyInfo> {
  //   return this.http.delete<LobbyInfo>(`${this.URL}/${id}`).pipe(
  //     tap((lobby) => {
  //       return (this.lobbies = this.lobbies.filter(
  //         (item) => item.id !== lobby.id
  //       ));
  //     })
  //   );
  // }

  extractCreateLobby() {
    fromEvent<StorageEvent>(window, 'storage')
      .pipe(
        filter((event) => event.key === 'createdLobby' && event.key !== null),
        map((event) => {
          return event.newValue;
        })
      )
      .subscribe((key) =>
        this.localStorage.setItem('createdLobby', key ?? 'false')
      );
  }
}
