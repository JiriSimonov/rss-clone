import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map, Observable, tap } from 'rxjs';
import { LobbyState, Player } from 'src/app/lobbies/models/lobbie-info.model';
import { ConfigService } from '../../shared/storage/services/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly Url = `${ConfigService.SERVER_URL}/file/images/meme`
  memes: string[] = [];
  usedMeme: string[] = [];
  players: Player[] = [];

  constructor(
    private http: HttpClient,
    private socket: Socket) { }

  getMemes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.Url}`).pipe(
      map(memesArr => {
        return memesArr.map(item => `${this.Url}/${item}`)
      }),
      tap((memesArr) => this.memes = memesArr.slice(0, 5)),
    )
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
    return this.socket.fromEvent('joinLobbyRequest');
  }
}
