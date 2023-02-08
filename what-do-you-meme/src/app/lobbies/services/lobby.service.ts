import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LobbyInfo } from '../models/lobbie-info.model';

@Injectable({
  providedIn: 'root',
})
export class LobbyService {
  private readonly URL = 'http://localhost:3000/lobbies';
  private readonly LobbyLimit = 5;
  public lobbies: LobbyInfo[] = [];

  constructor(private http: HttpClient) {}

  getAllLobbies(page = 1, limit = this.LobbyLimit): Observable<LobbyInfo[]> {
    return this.http
      .get<LobbyInfo[]>(`${this.URL}?_page=${page}&_limit=${limit}`)
      .pipe(
        tap((lobbies) => {
          this.lobbies = [...lobbies];
        })
      );
  }

  getLobbie(id: string): Observable<LobbyInfo> {
    return this.http.get<LobbyInfo>(`${this.URL}/${id}`);
  }

  createNewLobby(lobby: LobbyInfo): Observable<LobbyInfo> {
    return this.http.post<LobbyInfo>(this.URL, lobby).pipe(
      tap((lobby) => {
        this.lobbies.push(lobby);
      })
    );
  }

  deleteLobby(id: string): Observable<LobbyInfo> {
    return this.http.delete<LobbyInfo>(`${this.URL}/${id}`).pipe(
      tap((lobby) => {
        return (this.lobbies = this.lobbies.filter(
          (item) => item.id !== lobby.id
        ));
      })
    );
  }
}
