import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { LobbyData, Player } from 'src/app/shared/model/lobby-data';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  memes: string[] = [];
  usedMeme: string[] = [];
  players: Player[] = [];

  constructor(private socket: Socket) {}

  getMemes() {
    this.socket.emit('getRandomMemes', { quantity: 5 }, (data: string[]) => {
      this.memes = data.map((item) => {
        return `http://${item}`;
      });
    });
  }

  getLobby(uuid: string): Promise<any> {
    return new Promise((resolve) => {
      this.socket.emit('getLobbyData', { uuid }, (data: LobbyData) => {
        resolve(data);
      });
    });
  }

  async getPlayers(uuid: string): Promise<any> {
    const players: any = Object.values((await this.getLobby(uuid)).players);
    this.players = players;
    return players;
  } // TODO РЕТЕПИЗИРУЙ, СОЗДАЙ СВОЙ ИНТЕРФЕЙС, ИЛИ ВЫНЕСИ В ШЭЙРД МОДУЛЬ ТО, ЧТО ОБЩЕЕ

  async joinLobbyRequest(uuid: string) {
    this.socket.emit('joinLobbyRequest', {
      uuid,
      password: (await this.getLobby(uuid)).password,
    });
  }

  joinLobbyEvent() {
    return this.socket.fromEvent<Player>('joinLobby');
  }
}
