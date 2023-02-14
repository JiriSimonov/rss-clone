import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { LobbyData } from 'src/app/shared/model/lobby-data';
import { IoInput, IoOutput } from 'src/app/shared/model/sockets-events';
import { gameLobbyData, GamePlayer } from '../models/game.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  memes: string[] = [];
  usedMeme: string[] = [];
  players: GamePlayer[] = [];

  constructor(private socket: Socket) {}

  getMemes() {
    this.socket.emit(IoInput.randomMemesRequest, { quantity: 5 }, (data: string[]) => {
      this.memes = data.map((item) => {
        return `http://${item}`;
      });
    });
  }

  getLobby(uuid: string): Promise<gameLobbyData> {
    return new Promise((resolve) => {
      this.socket.emit(IoInput.lobbyDataRequest, { uuid }, (data: gameLobbyData) => {
        resolve(data);
      });
    });
  }

  async getPlayers(uuid: string): Promise<GamePlayer[]> {
    const players: GamePlayer[] = Object.values((await this.getLobby(uuid)).players);
    this.players = players;
    return players;
  }

  async joinLobbyRequest(uuid: string) {
    this.socket.emit(IoInput.joinLobbyRequest, {
      uuid,
      password: (await this.getLobby(uuid)).password,
    });
  }

  joinLobbyEvent() {
    return this.socket.fromEvent<gameLobbyData['players']>(IoOutput.joinLobby);
  }

  leaveLobbyRequest(uuid: string) {
    return this.socket.emit(IoInput.leaveLobbyRequest, {uuid});
  }

  leaveLobbyEvent() {
    return this.socket.fromEvent<gameLobbyData['players']>(IoOutput.leaveLobby);
  }
}
