import { inject } from '@angular/core';
import { Route, Router, UrlSegment } from '@angular/router';
import { map } from 'rxjs';
import { LobbyService } from '../services/lobby.service';

export const isValidLobbyPageGuard = [(route: Route, segments: UrlSegment[]) => {
  const router = inject(Router);
  const lobbyService = inject(LobbyService);
  const id = +segments[0].path;
  if (id <= 0 || typeof id !== 'number') return router.createUrlTree(['lobbies']);
  return lobbyService.getAllLobbies(+segments[0].path).pipe(
    map((str) => {
      return lobbyService.lobbies.length !== 0 ? true : router.createUrlTree(['lobbies']);
    }),
  );
}];
