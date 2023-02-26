import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {DEFAULT_ROUTER_FEATURENAME, routerReducer} from '@ngrx/router-store';
import {isGameRouteGuard} from './guards/is-game-route.guard';
import {NotFoundComponent} from "./shared/components/not-found/not-found.component";
import {IsUserGuard} from "./guards/is-user.guard";
import {IsGuestGuard} from "./guards/is-guest.guard";
import {RouterRoutes} from "./shared/model/router.routes";

const routes: Routes = [{path: '', pathMatch: 'full', redirectTo: 'lobbies'}, {
  path: RouterRoutes.auth,
  loadChildren: () => import('./auth/auth.module').then((module) => module.AuthModule),
  canMatch: [IsGuestGuard],
}, {
  path: RouterRoutes.user,
  loadChildren: () => import('./user/user.module').then((module) => module.UserModule),
  canMatch: [IsUserGuard],
  canActivate: isGameRouteGuard,
}, {
  path: RouterRoutes.game,
  loadChildren: () => import('./game/game.module').then((module) => module.GameModule),
  canMatch: [IsUserGuard],
  canActivate: isGameRouteGuard,
}, {
  path: RouterRoutes.chat,
  loadChildren: () => import('./global-chat/global-chat.module').then((module) => module.GlobalChatModule),
  canMatch: [IsUserGuard],
  canActivate: isGameRouteGuard,
}, {
  path: RouterRoutes.lobbies,
  loadChildren: () => import('./lobbies/lobbies.module').then((module) => module.LobbiesModule),
  canMatch: [IsUserGuard],
  canActivate: isGameRouteGuard,
}, {
  path: RouterRoutes.gallery,
  loadChildren: () => import('./gallery/gallery.module').then((module) => module.GalleryModule),
  canActivate: isGameRouteGuard
}, {
  path: RouterRoutes.wildcard, component: NotFoundComponent,
},];

@NgModule({
  imports: [RouterModule.forRoot(routes), StoreModule.forFeature(DEFAULT_ROUTER_FEATURENAME, routerReducer),],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
