import { ConfigService } from './../../../shared/storage/services/config/config.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LobbyValidatorsService {
  constructor(private http: HttpClient) {}

  isUniqueLobbyName(name: string) {
    return this.http.get<boolean>(`${ConfigService.SERVER_URL}/lobbies/is-title-unique?title=${name}`);
  }

  isCorrectLobbyPassword(uuid: string, password: string) {
    return this.http.get<boolean>(`${ConfigService.SERVER_URL}/lobbies/is-password-correct?uuid=${uuid}&password=${password}`);
  }

  isUserCreatedLobby(owner: string) {
    return this.http.get<boolean>(`${ConfigService.SERVER_URL}/lobbies/is-lobby-owner?username=${owner}`);
  }
}
