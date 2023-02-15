import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { IoInput, IoOutput } from '../../shared/model/sockets-events';
import { MessageData } from '../models/messageData';

@Injectable({
  providedIn: 'root',
})
export class GlobalChatService {
  constructor(private socket: Socket) { }

  sendMessage(data: MessageData) {
    this.socket.emit(IoInput.chatMessageRequest, data);
  }

  getMessage() {
    return this.socket.fromEvent<MessageData>(IoOutput.chatMessage);
  }
}