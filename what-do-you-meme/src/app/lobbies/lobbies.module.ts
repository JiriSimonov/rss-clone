import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LobbiesPageComponent } from './pages/lobbies-page/lobbies-page.component';
import { LobbyInfoComponent } from './components/lobby-info/lobby-info.component';
import { LobbyCreateModalComponent } from './components/lobby-create-modal/lobby-create-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LobbiesRoutingModule } from './lobbies-routing.module';

@NgModule({
  declarations: [
    LobbiesPageComponent,
    LobbyInfoComponent,
    LobbyCreateModalComponent
  ],
  imports: [
    CommonModule,
    LobbiesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LobbiesModule { }
