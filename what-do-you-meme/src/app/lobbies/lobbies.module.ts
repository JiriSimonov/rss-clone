import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LobbiesPageComponent } from './pages/lobbies-page/lobbies-page.component';
import {RouterModule} from "@angular/router";
import { LobbyInfoComponent } from './components/lobby-info/lobby-info.component';
import { LobbyCreateModalComponent } from './components/lobby-create-modal/lobby-create-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LobbiesRoutingModule } from './lobbies-routing.module';
import { LobbySearchComponent } from './components/lobby-search/lobby-search.component';
import { LobbiesPaginationComponent } from './components/lobbies-pagination/lobbies-pagination.component';

@NgModule({
  declarations: [
    LobbiesPageComponent,
    LobbyInfoComponent,
    LobbyCreateModalComponent,
    LobbySearchComponent,
    LobbiesPaginationComponent
  ],
  imports: [
    CommonModule,
    LobbiesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LobbiesModule { }
