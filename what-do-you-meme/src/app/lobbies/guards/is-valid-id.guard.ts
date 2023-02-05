import { Injectable } from '@angular/core';
import { CanMatch, Route, UrlSegment, UrlTree } from '@angular/router';
import { catchError, map, Observable, tap } from 'rxjs';
import { LobbyService } from '../services/lobby.service';

@Injectable({
  providedIn: 'root'
})
export class IsValidIdGuard implements CanMatch {
  constructor(private lobbyService: LobbyService) { }

  canMatch(route: Route, segments: UrlSegment[]) {
    return this.lobbyService.getLobbie(segments[1].path).pipe(map(obj => {
      return true;
    }),
    catchError((err) => {
      return [];
    }));
  }
}
