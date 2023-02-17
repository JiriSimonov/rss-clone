import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {GameService} from '../game/services/game.service';
import {SessionStorageService} from "../shared/storage/services/session-storage.service";

export const isGameRouteGuard = [
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const gameService = inject(GameService);
    const url = SessionStorageService.previousGameUrl;
    if (url && url !== state.url) {
      gameService.leaveLobbyRequest(url);
      sessionStorage.clear();
    }
  },
];
