import { LocalStorageService } from '../local-storage/local-storage.service';

export class ConfigService {
  static SERVER_URL = 'http://localhost:3000';
  static get socketConfig() {
    return {
      url: this.SERVER_URL,
      options: {
        auth: {
          username: LocalStorageService.username,
        },
      },
    };
  }
}
