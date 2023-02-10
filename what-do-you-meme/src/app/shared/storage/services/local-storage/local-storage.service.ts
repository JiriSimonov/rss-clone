import { Inject, Injectable } from '@angular/core';
import { localStoragePrefix } from '../../../../app.module';
import { STORAGE_KEY_PREFIX } from '../../tokens/storage-key.token';
import { WINDOW } from '../../tokens/window.token';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService extends StorageService {
  public constructor(
    @Inject(WINDOW) window: Window,
    @Inject(STORAGE_KEY_PREFIX) prefix: string
  ) {
    super(window.localStorage, prefix);
  }

  static get username() {
    const data = window.localStorage.getItem(`[${localStoragePrefix}]authData`);
    return data ? JSON.parse(data).value.username : null;
  }
}
