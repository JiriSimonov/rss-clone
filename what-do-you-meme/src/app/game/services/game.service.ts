import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { LobbyState, Player } from 'src/app/lobbies/models/lobbie-info.model';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  memes: string[] = [];
  usedMeme: string[] = [];
  players: Player[] = [];

  constructor(private socket: Socket) { }

  getMemes() {
    this.socket.emit("getRandomMemes", { quantity: 5 }, (data: string[]) => {
      this.memes = data.map(item => {
        return `http://${item}`;
      })
    });
  }

  getLobby(uuid: string): Promise<LobbyState> {
    return new Promise((resolve) => {
      this.socket.emit('getLobbyData', { uuid }, (data: LobbyState) => {
        resolve(data)
      });
    });
  }

  async getPlayers(uuid: string): Promise<Player[]> {
    const players = Object.values((await this.getLobby(uuid)).players);
    this.players = players;
    return players;
  }

  async joinLobbyRequest(uuid: string) {
    this.socket.emit('joinLobbyRequest', {
      uuid,
      password: (await this.getLobby(uuid)).password,
    });
  }

  joinLobbyEvent() {
    return this.socket.fromEvent<Player>('joinLobby');
  }

  getLobby() {
    this.socket.emit('getLobbyData', { uuid: this.activatedRoute.snapshot.params['id'] }, (data: any) => {
      this.players = Object.values(data.players);
    });
  }
}