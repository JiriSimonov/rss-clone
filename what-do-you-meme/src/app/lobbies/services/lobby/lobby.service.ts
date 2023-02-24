import {IoInput} from '../../../shared/model/sockets-events';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../../shared/storage/services/local-storage/local-storage.service';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Socket} from 'ngx-socket-io';
import {LobbyData} from 'src/app/lobbies/model/lobby-data';
import {createLobby} from '../../model/create-lobby';

@Injectable({
  providedIn: 'root',
})
export class LobbyService {
  private currentId$$ = new BehaviorSubject<string>('');
  public currentId$ = this.currentId$$.asObservable();
  private lobbies$$ = new BehaviorSubject<LobbyData[]>([]);
  public lobbies$ = this.lobbies$$.asObservable();
  private chunkOptions = {
    page: 0,
    limit: 8,
  };
  private lobbiesOptions = {
    chunk: this.chunkOptions,
    privacy: 'all',
    nameContains: '',
  };

  constructor(
    private localStorage: LocalStorageService,
    private socket: Socket,
    private router: Router,
  ) {
  }

  resetPrivacy() {
    this.lobbiesOptions.privacy = 'all';
  }

  changePrivacy(value: string) {
    this.lobbiesOptions.privacy = value;
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
    this.lobbiesOptions.nameContains = value;
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
        this.router.navigate([`/game/${data.uuid}`], {replaceUrl: true}).catch();
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

  changeLobbyId(uuid: string) {
    this.currentId$$.next(uuid);
  }
}
