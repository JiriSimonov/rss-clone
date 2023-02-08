import { GlobalChatService } from './../../services/global-chat.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, tap } from 'rxjs';
import { MessageData } from '../../models/messageData';

@Component({
  selector: 'app-global-chat',
  templateUrl: './global-chat.component.html',
  styleUrls: ['./global-chat.component.scss'],
})
export class GlobalChatComponent implements OnInit {
  sendMessageForm!: FormGroup;
  messageList: MessageData[] = [];

  constructor(private chatService: GlobalChatService) {}

  ngOnInit(): void {
    this.sendMessageForm = new FormGroup({
      messageControl: new FormControl('', [
        Validators.required,
        Validators.maxLength(308),
      ]),
    });
    this.chatService
      .getMessage()
      .pipe(
        tap((data) => {
          console.log(data);
        })
      )
      .subscribe((msg) => this.messageList.push(msg));
  }

  get messageControlValue() {
    return this.sendMessageForm.get('messageControl')?.value;
  }

  get messageControl() {
    return this.sendMessageForm.get('messageControl');
  }

  sendMessage() {
    this.chatService.sendMessage({
      username: 'ddd',
      message: this.messageControlValue,
    });
  }
}
