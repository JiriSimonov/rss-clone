import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalChatPageComponent } from './pages/global-chat-page/global-chat-page.component';
import { GlobalChatComponent } from './components/global-chat/global-chat.component';



@NgModule({
  declarations: [
    GlobalChatPageComponent,
    GlobalChatComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: GlobalChatPageComponent,
    }])
  ]
})
export class GlobalChatModule { }
