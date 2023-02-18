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
  gameData?: GameCurrentData;

  constructor(private socket: Socket) { }

  getMemes() {
    this.socket.emit(IoInput.randomMemesRequest, { quantity: 5 }, (data: string[]) => {
      this.memes = data.map((item) => {
        return `http://${item}`;
      });
    });
  }

  // set playersList(players: GameLobbyData['players']) {
  //   this.players = Object.values(players);
  // }

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
