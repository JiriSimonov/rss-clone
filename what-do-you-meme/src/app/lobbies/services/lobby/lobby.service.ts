import {IoInput, IoOutput} from '../../../shared/model/sockets-events';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../../shared/storage/services/local-storage/local-storage.service';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Socket} from 'ngx-socket-io';
import {LobbyData} from 'src/app/lobbies/model/lobby-data';
import {createLobby} from '../../model/create-lobby';
import {SessionStorageService} from "../../../shared/storage/services/session-storage.service";

@Injectable({
  providedIn: 'root',
})
export class LobbyService {
  private currentUUID$$ = new BehaviorSubject<string>('');
  public currentUUID$ = this.currentUUID$$.asObservable();
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
    private sessionStorageService: SessionStorageService
  ) {
  }

  get lobbies(): LobbyData[] {
    return this.lobbies$$.value;
  }

  set newLobbiesData(lobby: LobbyData) {
    this.lobbies$$.next([...this.lobbies, lobby]);
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

  joinLobby(data: LobbyData | undefined, password: string) {
    this.socket.emit(IoInput.joinLobbyRequest, {uuid: data?.uuid, password}, () => {
    this.sessionStorageService.setItem('lobbyPassword', password);
    this.router.navigate([`/game/${data?.uuid}`], {
      replaceUrl: true,
    }).catch();
    });
  }

  createLobby(options: createLobby) {
    this.socket.emit(
      IoInput.createLobbyRequest,
      {lobby: options},
      (data: LobbyData) => {
        this.joinLobby(data, options.password);
        this.sessionStorageService.setItem('lobbyPassword', options.password);
        this.router.navigate([`/game/${data.uuid}`], {replaceUrl: true}).catch();
      }
    );
  }

  getLobbiesList() {
    this.socket.emit(
      IoInput.lobbyListRequest,
      this.lobbiesOptions,
      (lobbies: LobbyData[]) => {
        this.lobbies$$.next([...this.lobbies, ...lobbies]);
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

  changeLobbyList(lobbies: LobbyData[]) {
    this.lobbies$$.next(lobbies);
  }

  lobbyUpdate() {
    return this.socket.fromEvent<LobbyData>(IoOutput.updateLobby);
  }

  lobbyDelete() {
    return this.socket.fromEvent<string>(IoOutput.deleteLobby);
  }

  lobbyCreate() {
    return this.socket.fromEvent<LobbyData>(IoOutput.createLobby);
  }

  changeUUID(uuid: string) {
    this.currentUUID$$.next(uuid);
  }

  getLobbyByUUID(uuid: string) {
    return this.lobbies$$.value.find((lobby) => lobby.uuid === uuid);
  }
}
