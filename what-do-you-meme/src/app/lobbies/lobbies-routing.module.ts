import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isValidLobbyPageGuard } from './guards/is-valid-lobby-page.guard';
import { LobbiesPageComponent } from './pages/lobbies-page/lobbies-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LobbiesPageComponent,
  },
  {
    path: ':id',
    component: LobbiesPageComponent,
    canMatch: isValidLobbyPageGuard,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class LobbiesRoutingModule { }
