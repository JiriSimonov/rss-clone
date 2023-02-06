import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAvatarService {
  avatarPath: string = 'https://wdym-js-er-sd.onrender.com/file/avatars/0'

  constructor() { }

  setAvatarPath(path: string) {
    this.avatarPath = path;
  }

  get avatar(): string {
    return this.avatarPath;
  }
}
