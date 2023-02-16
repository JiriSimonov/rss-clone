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

@NgModule({
  declarations: [
    GamePageComponent,
    GameChatComponent,
    GameJoinedUsersComponent,
    GamePlaygroundComponent,
    MemeCardComponent,
    GameVotingPhaseComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    ReactiveFormsModule,
    DragDropModule,
  ]
})
export class GameModule { }
