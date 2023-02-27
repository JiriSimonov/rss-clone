import {Inject, Injectable} from '@angular/core';
import {WINDOW} from "../tokens/window.token";
import {STORAGE_KEY_PREFIX} from "../tokens/storage-key.token";
import {StorageService} from "./storage/storage.service";
import {STORAGE_PREFIX} from "../../../app.module";

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService extends StorageService {
  public constructor(
    @Inject(WINDOW) window: Window,
    @Inject(STORAGE_KEY_PREFIX) prefix: string
  ) {
    super(window.sessionStorage, prefix);
  }

  static get previousGameUrl() {
    const data = window.sessionStorage.getItem(`[${STORAGE_PREFIX}]url`);
    return data ? JSON.parse(data).value : null;
  }
}
