import { inject } from '@angular/core';
import { Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { map } from 'rxjs';
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
  (route: Route, state: RouterStateSnapshot) => {
    if (sessionStorage.getItem('url') &&
        state.url !== sessionStorage.getItem('url')
       ) {
        // leave lobby here
        console.log(10);
        sessionStorage.clear();
    }
  }
]
