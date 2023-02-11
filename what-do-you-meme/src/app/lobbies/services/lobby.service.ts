import { Router } from '@angular/router';
import { LocalStorageService } from './../../shared/storage/services/local-storage/local-storage.service';
import { Injectable } from '@angular/core';
import { filter, fromEvent, map, Observable, tap } from 'rxjs';
import {
  LobbyListOptions,
  LobbyOptions,
  LobbyState,
} from '../models/lobbie-info.model';
import { LobbyModalService } from './lobby-modal/lobby-modal.service';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class LobbyService {
  public lobbies: any[] = []; //todo типизация
  public chunkOptions = {
    page: 0,
    limit: 10,
  };

  constructor(
    private localStorage: LocalStorageService,
    private lobbyModal: LobbyModalService,
    private socket: Socket,
    private router: Router
  ) {}

  get currentPage(): number {
    return this.chunkOptions.page;
  }

  incrementPage(): void {
    ++this.chunkOptions.page;
  }

  joinLobby(data: LobbyState) {
    this.socket.emit('joinLobbyRequest', data);
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

  getLobbiesList(options: LobbyListOptions) {
    return new Promise((resolve) =>
      this.socket.emit('getLobbyList', options, (res: any) => {
        console.log(res);
        resolve(res);
      })
    );
  }

  getInitialLobbiesList() {
    return new Promise((resolve) =>
      this.socket.emit('getLobbyList', this.chunkOptions, (res: any) => {
        this.lobbies = res;
      })
    );
  }

  isValidPassword(uuid: string, password: string) {
    return new Promise((resolve) => {
      this.socket.emit(
        'isPasswordCorrectRequest',
        { uuid, password },
        (res: boolean) => {
          return res ? { isPasswordCorrect: true } : null;
        }
      );
    });
  }

  getLobby(uuid: string) {
    this.socket.emit('getLobbyData', uuid, (res: LobbyState) => {
      console.log(res);
    });
  }

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
