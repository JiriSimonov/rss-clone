import { LocalStorageService } from '../local-storage/local-storage.service';

export class ConfigService {
  private static servers = {
    local: 'http://localhost:3000',
    render: 'https://wdym-js-er-sd.onrender.com',
  };
  static get SERVER_URL() {
    return this.servers.render;
  }
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
