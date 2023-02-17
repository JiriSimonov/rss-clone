import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { IoInput, IoOutput } from 'src/app/shared/model/sockets-events';
import { GameCurrentData, GameLobbyData, GamePlayer } from '../models/game.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  memes: string[] = [];
  usedMeme: string[] = [];
  players: GamePlayer[] = [];
  gameData?: GameCurrentData;

  constructor(private socket: Socket) { }

  getMemes() {
    this.socket.emit(IoInput.randomMemesRequest, { quantity: 5 }, (data: string[]) => {
      this.memes = data.map((item) => {
        return `http://${item}`;
      });
    });
  }

  // Обсудить

  // getLobby(uuid: string): Promise<GameLobbyData> {
  //   return new Promise((resolve) => {
  //     this.socket.emit(IoInput.lobbyDataRequest, { uuid }, (data: GameLobbyData) => {
  //       console.log(data)
  //     });
  //   });
  // }

  // async joinLobbyRequest(uuid: string) {
  //   this.socket.emit(IoInput.joinLobbyRequest, {
  //     uuid,
  //     password: (await this.getLobby(uuid)).password,
  //   }, (data: any) => console.log(data));
  // }

  set playersList(players: GameLobbyData['players']) {
    this.players = Object.values(players);
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
