import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamePageComponent } from './pages/game-page/game-page.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    GamePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: 'game',
      pathMatch: 'full',
      component: GamePageComponent,
    }])
  ]
})
export class GameModule { }
