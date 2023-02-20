import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { DEFAULT_ROUTER_FEATURENAME, routerReducer } from '@ngrx/router-store';
import { isGameRouteGuard } from './guards/guards';
import {NotFoundComponent} from "./shared/components/not-found/not-found.component";
import {IsUserGuard} from "./guards/is-user.guard";
import {IsGuestGuard} from "./guards/is-guest.guard";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'lobbies' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((module) => module.AuthModule),
    canMatch: [IsGuestGuard],
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./user/user.module').then((module) => module.UserModule),
    canMatch: [IsUserGuard],
    canActivate: isGameRouteGuard,
  },
  {
    path: 'game',
    loadChildren: () =>
      import('./game/game.module').then((module) => module.GameModule),
    canMatch: [IsUserGuard],
    canActivate: isGameRouteGuard,
  },
  {
    path: 'chat',
    loadChildren: () =>
      import('./global-chat/global-chat.module').then(
        (module) => module.GlobalChatModule
      ),
    canMatch: [IsUserGuard],
    canActivate: isGameRouteGuard,
  },
  {
    path: 'lobbies',
    loadChildren: () =>
      import('./lobbies/lobbies.module').then((module) => module.LobbiesModule),
    canMatch: [IsUserGuard],
    canActivate: isGameRouteGuard,
  },
  { path: '**',
    component: NotFoundComponent,
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
