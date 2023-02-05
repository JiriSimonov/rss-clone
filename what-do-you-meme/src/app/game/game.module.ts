import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { GameRoutingModule } from './game-routing.module';



@NgModule({
  declarations: [
    GamePageComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
  ]
})
export class GameModule { }
