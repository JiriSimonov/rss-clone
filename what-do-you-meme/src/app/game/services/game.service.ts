import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { IoInput, IoOutput } from 'src/app/shared/model/sockets-events';
import { GameCurrentData } from '../models/game.model';
import {ConfigService} from "../../shared/services/config/config.service";

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly URL = ConfigService.SERVER_URL;
  memes: string[] = [];
  usedMeme: string[] = [];
  gameData?: GameCurrentData;

  constructor(private http: HttpClient, private socket: Socket) { }

  isLobbyOwner(username: string, uuid: string) {
    return this.http.get<boolean>(`${this.URL}/lobbies/is-lobby-owner`,
      { params: {
      username,
      uuid
      }
    });
  }

  getMemes() {
    this.socket.emit(IoInput.randomMemesRequest, { quantity: 5 }, (data: string[]) => {
      this.memes = data.map((item) => {
        return `http://${item}`;
      });
    });
  }

  joinLobbyRequest(uuid: string) {
    this.socket.emit(IoInput.joinLobbyRequest, {
      uuid,
      password: '',
    }, (gameData: GameCurrentData) => {
      console.log(gameData);
      this.gameData = gameData;
    });
  }

  leaveLobbyRequest(uuid: string) {
    return this.socket.emit(IoInput.leaveLobbyRequest, { uuid });
  }

  pickMemeRequest(uuid: string, meme: string = this.usedMeme[0]) {
    return this.socket.emit(IoInput.pickMeme, {
      uuid,
      meme,
    });
  }

  getVote(uuid: string, vote: string) {
    this.socket.emit(IoInput.getVote, {
      uuid,
      vote,
    })
  }

  startGameRequest(uuid: string) {
    this.socket.emit(IoInput.startGame, uuid);
  }

  forceChangeRequest(uuid: string) {
    this.socket.emit(IoInput.forcedChangePhase, uuid);
  }

  joinLobbyEvent(): Observable<GameCurrentData> {
    return this.socket.fromEvent<GameCurrentData>(IoOutput.joinLobby);
  }

  leaveLobbyEvent(): Observable<GameCurrentData> {
    return this.socket.fromEvent<GameCurrentData>(IoOutput.leaveLobby);
  }

  changePhaseEvent(): Observable<GameCurrentData> {
    return this.socket.fromEvent<GameCurrentData>(IoOutput.changePhase);
  }

  errorSocketEvent() {
    return this.socket.fromEvent('error');
  }
}
