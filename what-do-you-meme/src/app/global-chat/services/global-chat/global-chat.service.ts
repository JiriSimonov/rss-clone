import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { IoInput, IoOutput } from '../../../shared/model/sockets-events';
import { MessageData } from '../../models/messageData';

@Injectable({
  providedIn: 'root',
})
export class GlobalChatService {
  constructor(private socket: Socket) { }

  sendMessage(message: MessageData) {
    this.socket.emit(IoInput.chatMessageRequest, message);
  }

  getMessage() {
    return this.socket.fromEvent<MessageData>(IoOutput.chatMessage);
  }
}
