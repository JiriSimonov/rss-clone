import { Injectable } from '@angular/core';
import { ConfigService } from '../storage/services/config/config.service';

@Injectable({
  providedIn: 'root',
})
export class UserAvatarService {
  avatarPath: string = `${ConfigService.SERVER_URL}/file/images/avatars/0`

  constructor() {}

  setAvatarPath(path: string) {
    this.avatarPath = path;
  }

  get avatar(): string {
    return this.avatarPath;
  }
}
