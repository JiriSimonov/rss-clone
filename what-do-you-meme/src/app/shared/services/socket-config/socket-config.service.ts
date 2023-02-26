import {LocalStorageService} from '../../storage/services/local-storage/local-storage.service';
import {ConfigService} from "../config/config.service";

export class SocketConfigService {
  static get socketConfig() {
    return {
      url: ConfigService.SERVER_URL,
      options: {
        autoConnect: false,
        auth: {
          username: LocalStorageService.username,
          image: LocalStorageService.userAvatar,
        },
      },
    };
  }
}
