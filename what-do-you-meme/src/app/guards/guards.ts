import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlSegment} from '@angular/router';
import {map} from 'rxjs';
import {GameService} from '../game/services/game.service';
import {UserPermissionsService} from '../utils/user-permissions.service';
import {SessionStorageService} from "../shared/storage/services/session-storage.service";

export const isUserGuards = [
  (_route: Route, _segments: UrlSegment[]) => {
    const router = inject(Router);
    return inject(UserPermissionsService).isUser$.pipe(
      map((isUser) => isUser || router.createUrlTree(['auth']))
    );
  },
];

export const isGuestGuards = [
  (_route: Route, _segments: UrlSegment[]) => {
    const router = inject(Router);
    return inject(UserPermissionsService).isUser$.pipe(
      map((isUser) => !isUser || router.createUrlTree(['lobbies']))
    );
  },
];

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
