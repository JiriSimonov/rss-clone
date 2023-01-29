import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LobbiesPageComponent } from './pages/lobbies-page/lobbies-page.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    LobbiesPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: LobbiesPageComponent,
    }])
  ]
})
export class LobbiesModule { }
