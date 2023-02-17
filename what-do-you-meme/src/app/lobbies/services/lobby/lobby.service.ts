import {IoInput} from '../../../shared/model/sockets-events';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../../shared/storage/services/local-storage/local-storage.service';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Socket} from 'ngx-socket-io';
import {LobbiesPrivate, LobbyData} from 'src/app/shared/model/lobby-data';
import {createLobby} from '../../model/create-lobby';

@Injectable({
  providedIn: 'root',
})
export class LobbyService {
  private lobbies$$ = new BehaviorSubject<LobbyData[]>([]);
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
    private router: Router,
  ) {
  }

  resetPrivacy() {
    this.lobbyPrivate$$.next(LobbiesPrivate.all);
  }

  incrementPage(): void {
    ++this.chunkOptions.page;
  }

  decrementPage(): void {
    --this.chunkOptions.page;
  }

  resetPage() {
    this.chunkOptions.page = 0;
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

  joinLobby(data: LobbyData) {
    this.socket.emit(IoInput.joinLobbyRequest, data);
  }

  createLobby(options: createLobby) {
    this.socket.emit(
      IoInput.createLobbyRequest,
      {lobby: options},
      (data: LobbyData) => {
        this.joinLobby(data);
        this.router.navigate([`/game/${data.uuid}`], {replaceUrl: true});
      }
    );
  }

  getLobbiesList() {
    this.socket.emit(
      IoInput.lobbyListRequest,
      this.lobbiesOptions,
      (lobbies: LobbyData[]) => {
        this.lobbies$$.next([...this.lobbies$$.value, ...lobbies]);
      }
    );
  }

  getNewLobbiesList() {
    this.resetPage();
    this.socket.emit(
      IoInput.lobbyListRequest,
      this.lobbiesOptions,
      (lobbies: LobbyData[]) => {
        this.lobbies$$.next(lobbies);
      }
    );
  }
}
