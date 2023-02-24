import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {SessionStorageService} from "../shared/storage/services/session-storage.service";
import {LobbyRequestsService} from "../game/services/lobby-requests.service";

export const isGameRouteGuard = [
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const lobbyRequests = inject(LobbyRequestsService);
    const url = SessionStorageService.previousGameUrl;
    if (url && url !== state.url.replace('/game/', '')) {
      lobbyRequests.leaveLobbyRequest(url);
      sessionStorage.clear();
    }
  },
];
