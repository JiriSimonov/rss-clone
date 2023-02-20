import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LobbiesPageComponent } from './pages/lobbies-page/lobbies-page.component';
import { LobbyInfoComponent } from './components/lobby-info/lobby-info.component';
import { LobbyCreateComponent } from './components/lobby-create/lobby-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LobbiesRoutingModule } from './lobbies-routing.module';
import { LobbySearchComponent } from './components/lobby-search/lobby-search.component';
import { LobbyJoinComponent } from './components/lobby-join-modal/lobby-join.component';
import { MaterialModule } from '../shared/material/material.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    LobbiesPageComponent,
    LobbyInfoComponent,
    LobbyCreateComponent,
    LobbySearchComponent,
    LobbyJoinComponent
  ],
    imports: [
        CommonModule,
        LobbiesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        MatCheckboxModule,
        InfiniteScrollModule,
        SharedModule,
    ]
})
export class LobbiesModule { }
