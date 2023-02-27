import { Injectable } from '@angular/core';
import {CanMatch, Route, Router, UrlSegment, UrlTree} from '@angular/router';
import {map, Observable} from 'rxjs';
import {UserPermissionsService} from "../utils/user-permissions.service";

@Injectable({
  providedIn: 'root'
})
export class IsGuestGuard implements CanMatch {
  constructor(private permissionsService: UserPermissionsService, private router: Router) {
  }
  canMatch(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.permissionsService.isUser$.pipe(
      map((isUser) => !isUser || this.router.createUrlTree(['lobbies']))
    );
  }
}
