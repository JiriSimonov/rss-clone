import { GlobalChatService } from './../../services/global-chat.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-global-chat',
  templateUrl: './global-chat.component.html',
  styleUrls: ['./global-chat.component.scss'],
})
export class GlobalChatComponent implements OnInit {
  sendMessageForm!: FormGroup;

  constructor(private chatService: GlobalChatService) {}

  ngOnInit(): void {
    this.sendMessageForm = new FormGroup({
      messageControl: new FormControl('', [
        Validators.required,
        Validators.maxLength(308),
      ]),
    });
  }

  get messageControlValue() {
    return this.sendMessageForm.get('messageControl')?.value;
  }

  get messageControl() {
    return this.sendMessageForm.get('messageControl');
  }

  sendMessage() {
    this.chatService.sendMessage(this.messageControlValue);
    console.log(this.messageControlValue);
  }
}
