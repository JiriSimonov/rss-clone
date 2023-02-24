import { Injectable } from '@angular/core';
import {Socket} from "ngx-socket-io";
import {IoInput, IoOutput} from "../../shared/model/sockets-events";
import {Observable} from "rxjs";
import {GameCurrentData} from "../models/game.model";
import {GameService} from "./game.service";

@Injectable({
  providedIn: 'root'
})
export class LobbyRequestsService {

  constructor(private socket: Socket, private gameService: GameService) { }

  startGameRequest(uuid: string) {
    this.socket.emit(IoInput.startGame, uuid);
  }

  forceChangePhaseRequest(uuid: string) {
    this.socket.emit(IoInput.forcedChangePhase, uuid);
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
      password: '',
    }, (gameData: GameCurrentData) => {
      console.log(0);
      this.gameService.changeGameData(gameData);
    });
  }

  leaveLobbyRequest(uuid: string) {
    return this.socket.emit(IoInput.leaveLobbyRequest, { uuid });
  }

  changePhaseEvent(): Observable<GameCurrentData> {
    return this.socket.fromEvent<GameCurrentData>(IoOutput.changePhase);
  }

  errorSocketEvent() {
    return this.socket.fromEvent('error');
  }
}
