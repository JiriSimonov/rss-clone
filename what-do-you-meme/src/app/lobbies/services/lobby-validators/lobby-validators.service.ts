import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ConfigService} from "../../../shared/services/config/config.service";

@Injectable({
  providedIn: 'root',
})
export class LobbyValidatorsService {
  private URL = ConfigService.SERVER_URL

  constructor(private http: HttpClient) {
  }

  isUniqueLobbyName(title: string) {
    return this.http.get<boolean>(`${this.URL}/lobbies/is-title-unique`, {
      params: {
        title,
      }
    });
  }

  isCorrectLobbyPassword(uuid: string, password: string) {
    return this.http.get<boolean>(`${this.URL}/lobbies/is-password-correct`, {
      params: {
        uuid,
        password,
      }
    });
  }

  isUserCreatedLobby(username: string) {
    return this.http.get<boolean>(`${this.URL}/lobbies/is-lobby-owner`, {
      params: {
        owner: username,
      }
    });
  }
}
