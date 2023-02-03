import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LobbiesPageComponent } from './pages/lobbies-page/lobbies-page.component';
import {RouterModule} from "@angular/router";
import { LobbyInfoComponent } from './components/lobby-info/lobby-info.component';
import { LobbyCreateModalComponent } from './components/lobby-create-modal/lobby-create-modal.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LobbiesPageComponent,
    LobbyInfoComponent,
    LobbyCreateModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: LobbiesPageComponent,
    }]),
    FormsModule,
  ]
})
export class LobbiesModule { }
