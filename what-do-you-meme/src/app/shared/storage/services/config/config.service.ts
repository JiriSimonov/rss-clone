import { LocalStorageService } from '../local-storage/local-storage.service';

export class ConfigService {
  static get socketConfig() {
    return {
      url: 'https://wdym-js-er-sd.onrender.com',
      options: {
        auth: {
          username: LocalStorageService.username,
        },
      },
    };
  }
}
