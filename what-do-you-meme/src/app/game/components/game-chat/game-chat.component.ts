import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MessageData } from 'src/app/global-chat/models/messageData';
import { GlobalChatService } from 'src/app/global-chat/services/global-chat.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-chat',
  templateUrl: './game-chat.component.html',
  styleUrls: ['./game-chat.component.scss']
})
export class GameChatComponent implements OnInit {
  chatForm!: FormGroup;
  isClosed: boolean = false;
  gameId: string = this.activatedRoute.snapshot.params['id'];
  chatMessages: MessageData[] = [];

  constructor(
    private authService: AuthService,
    private chatService: GlobalChatService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.chatForm = new FormGroup({
      chat: new FormControl(''),
    });

    this.chatService.getMessage().subscribe(message => {

      this.chatMessages.push(message);
    });
  }


  get chatControl() {
    return this.chatForm.get('chat');
  }

  onSubmit() {
    this.authService.username$.subscribe((username) => {
      this.chatService.sendMessage({
        username: username,
        message: this.chatControl?.value,
        roomname: this.gameId,
      });
    });
  }

  toggleChat() {
    this.isClosed = !this.isClosed;
  }
}
