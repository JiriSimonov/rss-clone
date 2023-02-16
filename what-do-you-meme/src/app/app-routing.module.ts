import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { DEFAULT_ROUTER_FEATURENAME, routerReducer } from '@ngrx/router-store';
import { isGuestGuards, isRoutingFromGameGuards, isUserGuards } from './guards/guards';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'lobbies' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((module) => module.AuthModule),
    canMatch: isGuestGuards,
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./user/user.module').then((module) => module.UserModule),
    canMatch: isUserGuards,
    canActivate: isRoutingFromGameGuards,
  },
  {
    path: 'game',
    loadChildren: () =>
      import('./game/game.module').then((module) => module.GameModule),
    canMatch: isUserGuards,
    canActivate: isRoutingFromGameGuards,
  },
  {
    path: 'chat',
    loadChildren: () =>
      import('./global-chat/global-chat.module').then(
        (module) => module.GlobalChatModule
      ),
    canMatch: isUserGuards,
    canActivate: isRoutingFromGameGuards,
  },
  {
    path: 'lobbies',
    loadChildren: () =>
      import('./lobbies/lobbies.module').then((module) => module.LobbiesModule),
    canMatch: isUserGuards,
    canActivate: isRoutingFromGameGuards,
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import('./not-found/not-found.module').then(
        (module) => module.NotFoundModule
      ),
  },
  { path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    StoreModule.forFeature(DEFAULT_ROUTER_FEATURENAME, routerReducer),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
