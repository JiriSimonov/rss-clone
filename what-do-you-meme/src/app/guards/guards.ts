import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { map } from 'rxjs';
import { GameService } from '../game/services/game.service';
import { UserPermissionsService } from '../utils/user-permissions.service';

export const isUserGuards = [
  (route: Route, segments: UrlSegment[]) => {
    const router = inject(Router);
    return inject(UserPermissionsService).isUser$.pipe(
      map((isUser) => isUser || router.createUrlTree(['auth']))
    );
  },
];

export const isGuestGuards = [
  (route: Route, segments: UrlSegment[]) => {
    const router = inject(Router);
    return inject(UserPermissionsService).isUser$.pipe(
      map((isUser) => !isUser || router.createUrlTree(['lobbies']))
    );
  },
];

export const isRoutingFromGameGuards = [
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const gameService = inject(GameService);
    if (sessionStorage.getItem('url') &&
        state.url !== sessionStorage.getItem('url')
       ) {
        gameService.leaveLobbyRequest((sessionStorage.getItem('url') ?? '').replace('/game/', ''));
        sessionStorage.clear();
    }
  }
]
