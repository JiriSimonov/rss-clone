import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { GameRoutingModule } from './game-routing.module';
import { GameChatComponent } from './components/game-chat/game-chat.component';
import { GameJoinedUsersComponent } from './components/game-joined-users/game-joined-users.component';
import { GamePlaygroundComponent } from './components/game-playground/game-playground.component';
import { MemeCardComponent } from './components/meme-card/meme-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { GameVotingPhaseComponent } from './components/game-voting-phase/game-voting-phase.component';
import { GameVotingResultsPhaseComponent } from './components/game-voting-results-phase/game-voting-results-phase.component';
import {SharedModule} from "../shared/shared.module";
import { GamePreparePhaseComponent } from './components/game-prepare-phase/game-prepare-phase.component';
import { GameEndingPhaseComponent } from './components/game-ending-phase/game-ending-phase.component';
import { MaterialModule } from '../shared/material/material.module';
import { GameChooseSituationPhaseComponent } from './components/game-choose-situation-phase/game-choose-situation-phase.component';

@NgModule({
  declarations: [
    GamePageComponent,
    GameChatComponent,
    GameJoinedUsersComponent,
    GamePlaygroundComponent,
    MemeCardComponent,
    GameVotingPhaseComponent,
    GameVotingResultsPhaseComponent,
    GamePreparePhaseComponent,
    GameEndingPhaseComponent,
    GameChooseSituationPhaseComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    ReactiveFormsModule,
    DragDropModule,
    SharedModule,
    MaterialModule,
  ]
})
export class GameModule { }
