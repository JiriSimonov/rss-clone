import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private static servers = {
    local: 'http://localhost:3000',
    render: 'https://wdym-js-er-sd.onrender.com',
  };

  static get SERVER_URL() {
    return this.servers.render;
  }
}
