import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { IoInput, IoOutput } from '../../../shared/model/sockets-events';
import { MessageData } from '../../../shared/model/messageData';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class GlobalChatService {
  private messageList$$ = new BehaviorSubject<MessageData[]>([]);
  public messageList$ = this.messageList$$.asObservable();
  constructor(private socket: Socket) { }

  sendMessage(message: Record<string, string>) {
    this.socket.emit(IoInput.chatMessageRequest, message);
  }

  updateMessagesList(message: MessageData) {
    this.messageList$$.next([...this.messageList$$.value, message]);
  }

  clearMessageList() {
    this.messageList$$.next([]);
  }

  getMessage() {
    return this.socket.fromEvent<MessageData>(IoOutput.chatMessage);
  }
}
