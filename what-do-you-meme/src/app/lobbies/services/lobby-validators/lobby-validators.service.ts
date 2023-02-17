import { SocketConfigService } from '../../../shared/services/socket-config/socket-config.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ConfigService} from "../../../shared/services/config/config.service";

@Injectable({
  providedIn: 'root',
})
export class LobbyValidatorsService {
  private URL = ConfigService.SERVER_URL
  constructor(private http: HttpClient) {}

  isUniqueLobbyName(name: string) {
    return this.http.get<boolean>(`${this.URL}/lobbies/is-title-unique?title=${name}`);
  }

  isCorrectLobbyPassword(uuid: string, password: string) {
    return this.http.get<boolean>(`${this.URL}/lobbies/is-password-correct?uuid=${uuid}&password=${password}`);
  }

  isUserCreatedLobby(owner: string) {
    return this.http.get<boolean>(`${this.URL}/lobbies/is-lobby-owner?username=${owner}`);
  }
}
