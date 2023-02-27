import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { LobbiesPageComponent } from '../lobbies/pages/lobbies-page/lobbies-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LobbiesPageComponent,
  },
  {
    path: ':id',
    component: GamePageComponent,
    // canMatch: isValidLobbyIdGuard,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class GameRoutingModule { }
