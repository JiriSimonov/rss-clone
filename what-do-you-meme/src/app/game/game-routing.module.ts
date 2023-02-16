import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { isValidLobbyIdGuard } from './guards/is-valid-lobby-id.guard';
import {NotFoundComponent} from "../shared/components/not-found/not-found.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: NotFoundComponent,
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
