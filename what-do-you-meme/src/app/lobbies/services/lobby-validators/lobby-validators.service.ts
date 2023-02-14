import { ConfigService } from './../../../shared/storage/services/config/config.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LobbyValidatorsService {
  constructor(private http: HttpClient) {}

  isUniqueLobbyName(name: string) {
    return this.http.get(`${ConfigService.SERVER_URL}`);
  }

  isCorrectLobbyPassword(password: string) {
    return this.http.get(`${ConfigService.SERVER_URL}`);
  }

  isUserCreatedLobby() {
    return this.http.get(`${ConfigService.SERVER_URL}`);
  }
}
