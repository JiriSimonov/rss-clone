import { LocalStorageService } from './../../shared/storage/services/local-storage/local-storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, fromEvent, map, Observable, tap } from 'rxjs';
import { LobbyInfo } from '../models/lobbie-info.model';

@Injectable({
  providedIn: 'root',
})
export class LobbyService {
  private readonly URL = 'http://localhost:3000/lobbies';
  public lobbies: LobbyInfo[] = [];
  public page = 1;

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {}

  get currentPage(): number {
    return this.page;
  }

  getLobbies(page: number): Observable<LobbyInfo[]> {
    return this.http
      .get<LobbyInfo[]>(`${this.URL}?_page=${page}&per_page=5`)
      .pipe(
        tap((lobbies) => {
          this.lobbies = [...lobbies];
        })
      );
  }

  getLobby(id: string): Observable<LobbyInfo> {
    return this.http.get<LobbyInfo>(`${this.URL}/${id}`);
  }

  getLobbyByName(name: string) {
    return this.http.get(`${this.URL}/${name}`);
  } // TODO

  createNewLobby(lobby: LobbyInfo): Observable<LobbyInfo> {
    return this.http.post<LobbyInfo>(this.URL, lobby).pipe(
      tap((lobby) => {
        this.lobbies.push(lobby);
      })
    );
  }

  isValidPassword(password: string) {
    return this.http.get(`${this.URL}/${password}`);
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

  extractCreateLobby() {
    fromEvent<StorageEvent>(window, 'storage')
      .pipe(
        filter((event) => event.key === 'createdLobby' && event.key !== null),
        map((event) => {
          return event.newValue;
        })
      )
      .subscribe((key) =>
        this.localStorage.setItem('createdLobby', key ?? 'false')
      );
  }
}
