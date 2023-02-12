import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LobbiesPageComponent } from './pages/lobbies-page/lobbies-page.component';
import { LobbyInfoComponent } from './components/lobby-info/lobby-info.component';
import { LobbyCreateModalComponent } from './components/lobby-create-modal/lobby-create-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LobbiesRoutingModule } from './lobbies-routing.module';
import { LobbySearchComponent } from './components/lobby-search/lobby-search.component';
import { LobbyJoinModalComponent } from './components/lobby-join-modal/lobby-join-modal.component';
import { MaterialModule } from '../shared/material/material.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    LobbiesPageComponent,
    LobbyInfoComponent,
    LobbyCreateModalComponent,
    LobbySearchComponent,
    LobbyJoinModalComponent
  ],
  imports: [
    CommonModule,
    LobbiesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatCheckboxModule,
    InfiniteScrollModule,
  ]
})
export class LobbiesModule { }
