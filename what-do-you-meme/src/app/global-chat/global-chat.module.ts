import { MaterialModule } from '../shared/material/material.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalChatPageComponent } from './pages/global-chat-page/global-chat-page.component';
import { GlobalChatComponent } from './components/global-chat/global-chat.component';
import { ReactiveFormsModule } from '@angular/forms';
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    GlobalChatPageComponent,
    GlobalChatComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        RouterModule.forChild([{
            path: '',
            pathMatch: 'full',
            component: GlobalChatPageComponent,
        }]),
        SharedModule
    ]
})
export class GlobalChatModule { }
