import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-game-chat',
  templateUrl: './game-chat.component.html',
  styleUrls: ['./game-chat.component.scss']
})
export class GameChatComponent implements OnInit{
  chatForm!: FormGroup;

  ngOnInit() {
    this.chatForm = new FormGroup({
      chat: new FormControl(''),
    });
  }

  get chatControl() {
    return this.chatForm.get('chat');
  }

  onSubmit() {
    console.log('message from chat');
  }
}
