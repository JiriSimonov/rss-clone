import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserGuestGuard} from "./guards/user-guest.guard";
import {UserAuthGuard} from "./guards/user-auth.guard";

const routes: Routes = [
  {
    path: 'user/auth',
    loadChildren: () => import('./user-auth/user-auth.module')
      .then(module => module.UserAuthModule),
    canLoad: [UserGuestGuard],
    canActivate: [UserGuestGuard],
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module')
      .then(module => module.UserModule),
    canLoad: [UserAuthGuard],
    canActivate: [UserAuthGuard],
  },
  { path: 'game', loadChildren: () => import('./game/game.module').then(module => module.GameModule)},
  { path: 'lobbies', loadChildren: () => import('./lobbies/lobbies.module').then(module => module.LobbiesModule) },
  { path: 'not-found', loadChildren: () => import('./not-found/not-found.module').then(module => module.NotFoundModule)},
  { path: '**', redirectTo: 'not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [UserGuestGuard, UserAuthGuard]
})
export class AppRoutingModule { }
