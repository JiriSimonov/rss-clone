import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamePageComponent } from '../game/pages/game-page/game-page.component';
import { NotFoundPageComponent } from '../not-found/pages/not-found-page/not-found-page.component';
import { isValidIdGuard } from './guards/is-valid-id.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: NotFoundPageComponent,
  },
  {
    path: ':id',
    component: GamePageComponent,
    canMatch: isValidIdGuard,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class GameRoutingModule { }