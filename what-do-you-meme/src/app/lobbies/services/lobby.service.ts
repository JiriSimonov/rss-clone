import { EventName } from './../../shared/model/sockets-events';
import { Router } from '@angular/router';
import { LocalStorageService } from './../../shared/storage/services/local-storage/local-storage.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, fromEvent, map, scan } from 'rxjs';
import {
  LobbyListOptions,
  LobbyOptions,
  LobbyState,
} from '../models/lobbie-info.model';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class LobbyService {
  private lobbies$$ = new BehaviorSubject<[string, LobbyState][]>([]);
  public lobbies$ = this.lobbies$$.asObservable();
  // public lobbies: [string, LobbyState][] = [];
  public chunkOptions = {
    page: 0,
    limit: 8,
  };

  constructor(
    private localStorage: LocalStorageService,
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
    this.socket.emit(EventName.joinLobbyRequest, data);
  }

  createLobby(options: LobbyOptions) {
    this.socket.emit(
      EventName.createLobbyRequest,
      { lobby: options },
      (data: LobbyState) => {
        this.joinLobby(data);
        this.router.navigate([`/game/${data.uuid}`], { replaceUrl: true });
      }
    );
  }

  getLobbiesList(options: LobbyListOptions) {
    this.socket.emit(
      EventName.getLobbyList,
      options,
      (res: [string, LobbyState][]) => {
        this.lobbies$$.next(res);
      }
    );
  }

  updateLobbiesList(options: LobbyListOptions) {
    this.socket.emit(
      EventName.getLobbyList,
      options,
      (res: [string, LobbyState][]) => {
        // this.lobbies$$.pipe(scan((prev, current) => [...prev, ...current]));
        this.lobbies$$.next([...this.lobbies$$.value, ...res]);
      }
    );
  }

  getInitialLobbiesList() {
    this.socket.emit(
      EventName.getLobbyList,
      this.chunkOptions,
      (res: [string, LobbyState][]) => {
        this.lobbies$$.next(res.slice(0, this.chunkOptions.limit));
      }
    );
  }

  isValidPassword(uuid: string, password: string) {
    return new Promise((resolve) => {
      this.socket.emit(
        EventName.isPasswordCorrectRequest,
        { uuid, password },
        (res: boolean) => {
          resolve(res === true ? { isPasswordCorrect: true } : null);
        }
      );
    });
  }

  isUniqueLobbyName(lobbyName: string) {
    return new Promise((resolve) => {
      this.socket.emit(
        EventName.isLobbyNameUniqueRequest,
        lobbyName,
        (res: any) => {
          resolve(res === true ? { isLobbyUnique: true } : null);
        }
      );
    });
  }

  getLobby(uuid: string) {
    this.socket.emit(EventName.getLobbyData, uuid, (res: LobbyState) => {
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
