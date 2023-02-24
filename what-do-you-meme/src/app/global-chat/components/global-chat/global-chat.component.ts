import {GlobalChatService} from '../../services/global-chat/global-chat.service';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageData} from '../../../shared/model/messageData';
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-global-chat',
  templateUrl: './global-chat.component.html',
  styleUrls: ['./global-chat.component.scss'],
})
export class GlobalChatComponent implements OnInit {
  sendMessageForm!: FormGroup;
  private messageList$$ = new BehaviorSubject<MessageData[]>([]);
  public messageList$ = this.messageList$$.asObservable();


  constructor(
    private chatService: GlobalChatService,
  ) {
  }

  ngOnInit(): void {
    this.sendMessageForm = new FormGroup({
      messageControl: new FormControl('', [
        Validators.required,
        Validators.maxLength(308),
      ]),
    });
    this.chatService.getMessage().subscribe((messageData) => {
      console.log(messageData.timestamp);
      messageData.timestamp = new Date(messageData?.timestamp).toLocaleTimeString('ru-RU');
      //TODO фикс кейса, когда вместо числел приходит дата
      this.messageList$$.next([...this.messageList$$.value, messageData]);
    });
  }

  get messageControlValue(): string {
    return this.sendMessageForm.get('messageControl')?.value;
  }

  get messageControl() {
    return this.sendMessageForm.get('messageControl');
  }

  onSubmit() {
    this.chatService.sendMessage({message: this.messageControlValue});
    this.messageControl?.setValue('');
  }
}
