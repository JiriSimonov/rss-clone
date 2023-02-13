import { EventName } from './../../shared/model/sockets-events';
import { Router } from '@angular/router';
import { LocalStorageService } from './../../shared/storage/services/local-storage/local-storage.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, fromEvent, map } from 'rxjs';
import { LobbyOptions, LobbyState } from '../models/lobbie-info.model';
import { Socket } from 'ngx-socket-io';
import { LobbiesPrivate } from '../models/lobbies-private.model';

@Injectable({
  providedIn: 'root',
})
export class LobbyService {
  private lobbies$$ = new BehaviorSubject<[string, LobbyState][]>([]);
  public lobbies$ = this.lobbies$$.asObservable();
  private lobbyPrivate$$ = new BehaviorSubject<LobbiesPrivate>(
    LobbiesPrivate.all
  );
  public lobbyPrivate$ = this.lobbyPrivate$$.asObservable();
  private lobbiesNameContains$$ = new BehaviorSubject<string>('');
  public lobbiesNameContains$ = this.lobbiesNameContains$$.asObservable();
  private chunkOptions = {
    page: 0,
    limit: 8,
  };
  private lobbiesOptions = {
    chunk: this.chunkOptions,
    privacy: this.lobbyPrivate$$.value,
    nameContains: this.lobbiesNameContains$$.value,
  };
  private lobbiesPrivacy = this.lobbyPrivate$.subscribe(
    (privacy) => (this.lobbiesOptions.privacy = privacy)
  );
  private lobbiesNames = this.lobbiesNameContains$.subscribe(
    (name) => (this.lobbiesOptions.nameContains = name)
  );

  constructor(
    private localStorage: LocalStorageService,
    private socket: Socket,
    private router: Router
  ) {}

  get lobbbiesLimit() {
    return this.chunkOptions.limit;
  }

  incrementLimit() {
    ++this.lobbbiesLimit;
  }

  set lobbbiesLimit(limit: number) {
    this.lobbbiesLimit = limit;
  }

  get currentPage(): number {
    return this.chunkOptions.page;
  }

  incrementPage(): void {
    ++this.chunkOptions.page;
  }

  changeNameContains(value: string) {
    this.lobbiesNameContains$$.next(value);
  }

  changePrivate(value: string) {
    this.lobbyPrivate$$.next(this.formatToEnumValues(value));
  }

  formatToEnumValues(value: string) {
    if (value === '') return LobbiesPrivate.all;
    return value === 'true' ? LobbiesPrivate.private : LobbiesPrivate.public;
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

  getLobbiesList() {
    this.socket.emit(
      EventName.getLobbyList,
      this.lobbiesOptions,
      (lobbies: [string, LobbyState][]) => {
        this.lobbies$$.next(lobbies);
      }
    );
  }

  updateLobbiesList() {
    this.socket.emit(
      EventName.getLobbyList,
      this.lobbiesOptions,
      (lobbies: [string, LobbyState][]) => {
        this.lobbies$$.next([...this.lobbies$$.value, ...lobbies]);
      }
    );
  }

  getInitialLobbiesList() {
    this.socket.emit(
      EventName.getLobbyList,
      this.lobbiesOptions,
      (lobbies: [string, LobbyState][]) => {
        this.lobbies$$.next(lobbies);
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
