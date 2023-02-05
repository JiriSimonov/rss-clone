import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { DEFAULT_ROUTER_FEATURENAME, routerReducer } from '@ngrx/router-store';
import { isGuestGuards, isUserGuards } from './guards/guards';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'lobbies' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/user-auth.module').then((module) => module.UserAuthModule),
    canMatch: isGuestGuards,
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./user/user.module').then((module) => module.UserModule),
    canMatch: isUserGuards,
  },
  {
    path: 'game/:id',
    loadChildren: () =>
      import('./game/game.module').then((module) => module.GameModule),
    canMatch: isUserGuards,
  },
  {
    path: 'lobbies',
    loadChildren: () =>
      import('./lobbies/lobbies.module').then((module) => module.LobbiesModule),
    canMatch: isUserGuards,
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import('./not-found/not-found.module').then(
        (module) => module.NotFoundModule
      ),
  },
  { path: '**', redirectTo: 'not-found' },
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
