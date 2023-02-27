import { Injectable } from '@angular/core';
import { Socket } from "ngx-socket-io";
import { IoInput, IoOutput } from "../../shared/model/sockets-events";
import { Observable } from "rxjs";
import { GameCurrentData } from "../models/game.model";
import { GameService } from "./game.service";
import { SessionStorageService } from "../../shared/storage/services/session-storage.service";

@Injectable({
  providedIn: 'root'
})
export class LobbyRequestsService {

  constructor(private socket: Socket, private gameService: GameService, private sessionStorageService: SessionStorageService) { }

  changePhaseRequest(uuid: string) {
    this.socket.emit(IoInput.changePhaseRequest, uuid);
  }

  joinLobbyEvent(): Observable<GameCurrentData> {
    return this.socket.fromEvent<GameCurrentData>(IoOutput.joinLobby);
  }

  leaveLobbyEvent(): Observable<GameCurrentData> {
    return this.socket.fromEvent<GameCurrentData>(IoOutput.leaveLobby);
  }

  joinLobbyRequest(uuid: string) {
    this.socket.emit(IoInput.joinLobbyRequest, {
      uuid,
      password: this.sessionStorageService.getItem('lobbyPassword') ?? '',
    }, (gameData: GameCurrentData) => {
      this.gameService.changeGameData(gameData);
    });
  }

  leaveLobbyRequest(uuid: string) {
    return this.socket.emit(IoInput.leaveLobbyRequest, { uuid });
  }

  destroyLobbyRequest(uuid: string) {
    return this.socket.emit(IoInput.destroyLobbyRequest, { uuid });
  }

  deleteLobbyEvent() {
    return this.socket.fromEvent<string>(IoOutput.deleteLobby);
  }

  changePhaseEvent(): Observable<GameCurrentData> {
    return this.socket.fromEvent<GameCurrentData>(IoOutput.changePhase);
  }

  errorSocketEvent() {
    return this.socket.fromEvent('error');
  }
}
