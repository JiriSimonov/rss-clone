import { AuthService } from './../../../shared/services/auth.service';
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

  constructor(
    private chatService: GlobalChatService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.sendMessageForm = new FormGroup({
      messageControl: new FormControl('', [
        Validators.required,
        Validators.maxLength(308),
      ]),
    });
    this.chatService.getMessage().subscribe((messageData) => {
      const hours = new Date(messageData?.timestamp ? messageData?.timestamp : '').getHours();
      const minutes = new Date(messageData?.timestamp ? messageData?.timestamp : '').getMinutes();
      messageData.timestamp = `${hours}:${minutes}`;
      messageData.timestamp?.toLocaleString();
      this.messageList.push(messageData);
    });
  }

  get messageControlValue() {
    return this.sendMessageForm.get('messageControl')?.value;
  }

  get messageControl() {
    return this.sendMessageForm.get('messageControl');
  }

  sendMessage() {
    this.authService.username$.subscribe((username) => {
      this.chatService.sendMessage({
        username,
        message: this.messageControlValue,
      });
    });
  }
}
