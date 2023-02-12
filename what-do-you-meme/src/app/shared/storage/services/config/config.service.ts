import { LocalStorageService } from '../local-storage/local-storage.service';

export class ConfigService {
  static SERVER_URL = 'https://wdym-js-er-sd.onrender.com';
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
