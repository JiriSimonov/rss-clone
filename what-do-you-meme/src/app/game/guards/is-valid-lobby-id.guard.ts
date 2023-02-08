import { inject } from '@angular/core';
import { Route, Router, UrlSegment } from '@angular/router';
import { catchError, map } from 'rxjs';
import { LobbyService } from 'src/app/lobbies/services/lobby.service';

export const isValidLobbyIdGuard  = [(route: Route, segments: UrlSegment[]) => {
  const router = inject(Router);
  return inject(LobbyService).getLobby(segments[0].path).pipe(
    map(() => {
      return true;
    }),
    catchError(() => {
      return router.navigate(['lobbies'], { replaceUrl: true });
    }));
}];