import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LobbyInfo } from '../models/lobbie-info.model';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {
  private readonly url = 'http://localhost:3000/lobbies'
  public lobbies:LobbyInfo[] = [];

  constructor(private http: HttpClient) {}

  getAllLobbies(): Observable<LobbyInfo[]> {
    return this.http.get<LobbyInfo[]>(this.url).pipe(
      tap((lobbies) => {
        this.lobbies = [...lobbies];
      })
    );
  }

  getLobbie(id: string): Observable<LobbyInfo> {
    return this.http.get<LobbyInfo>(`${this.url}/${id}`);
  }

  createNewLobby(lobby: LobbyInfo): Observable<LobbyInfo> {
    return this.http.post<LobbyInfo>(this.url, lobby).pipe(tap(lobby => this.lobbies.push(lobby)));
  }

  deleteLobby(id: string): Observable<LobbyInfo> {
    return this.http.delete<LobbyInfo>(`this.url/${id}`).pipe(tap((lobby) => {
      return this.lobbies = this.lobbies.filter((item) => item.id !== lobby.id);
    }));
  }
}
