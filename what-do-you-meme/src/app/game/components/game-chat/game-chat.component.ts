import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MessageData } from 'src/app/shared/model/messageData';
import { GlobalChatService } from 'src/app/global-chat/services/global-chat/global-chat.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-game-chat',
  templateUrl: './game-chat.component.html',
  styleUrls: ['./game-chat.component.scss']
})
export class GameChatComponent implements OnInit, OnDestroy {
  chatForm!: FormGroup;
  isClosed: boolean = false;
  gameId: string = this.activatedRoute.snapshot.params['id'];
  chatMessages$$ = new BehaviorSubject<MessageData[]>([]);
  chatMessages$ = this.chatMessages$$.asObservable();
  getMessageSubs = new Subscription();

  constructor(
    private chatService: GlobalChatService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.chatForm = new FormGroup({
      chat: new FormControl('', [
        Validators.required,
        Validators.maxLength(80),
      ]),
    });

    this.getMessageSubs.add(
      this.chatService.getMessage().subscribe((message) => {
        if (message.room === this.gameId) {
          this.chatMessages$$.next([...this.chatMessages$$.value, message]);
        }
      }),
    )
  }

  get chatControl() {
    return this.chatForm.get('chat');
  }

  onSubmit() {
    this.chatService.sendMessage({
      message: this.chatControl?.value,
      room: this.gameId,
    });
    this.chatControl?.setValue('');
  }

  toggleChat() {
    this.isClosed = !this.isClosed;
  }

  ngOnDestroy(): void {
    this.getMessageSubs.unsubscribe();
    this.chatMessages$$.next([]);
  }
}
