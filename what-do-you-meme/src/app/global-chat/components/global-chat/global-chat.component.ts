import {GlobalChatService} from '../../services/global-chat/global-chat.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-global-chat',
  templateUrl: './global-chat.component.html',
  styleUrls: ['./global-chat.component.scss'],
})
export class GlobalChatComponent implements OnInit, OnDestroy {
  public sendMessageForm!: FormGroup;
  public subs = new Subscription();
  public messageList$ = this.chatService.messageList$;

  constructor(
    private chatService: GlobalChatService,
  ) { }

  get messageControlValue(): string {
    return this.sendMessageForm.get('messageControl')?.value;
  }

  get messageControl() {
    return this.sendMessageForm.get('messageControl');
  }

  ngOnInit(): void {
    this.sendMessageForm = new FormGroup({
      messageControl: new FormControl('', [
        Validators.required,
        Validators.maxLength(308),
      ]),
    });

    this.subs.add(
      this.chatService.getMessage().subscribe((messageData) => {
        this.chatService.updateMessagesList(messageData);
      })
    )
  }

  onSubmit() {
    this.chatService.sendMessage({ message: this.messageControlValue });
    this.messageControl?.setValue('');
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.chatService.clearMessageList();
  }
}
