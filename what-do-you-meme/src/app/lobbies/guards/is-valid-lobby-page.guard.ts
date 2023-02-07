import { inject } from '@angular/core';
import { Route, Router, UrlSegment } from '@angular/router';
import { map } from 'rxjs';
import { LobbyService } from '../services/lobby.service';

export const isValidLobbyPageGuard = [(route: Route, segments: UrlSegment[]) => {
  const router = inject(Router);
  const lobbyService = inject(LobbyService);
  return lobbyService.getAllLobbies(+segments[0].path).pipe(
    map((str) => {
      console.log(str);
      return lobbyService.lobbies.length !== 0 ? true : router.createUrlTree(['lobbies']);
    }),
  );
}];
