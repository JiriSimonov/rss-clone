import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { MessageData } from '../models/messageData';

@Injectable({
  providedIn: 'root',
})
export class GlobalChatService {
  constructor(private socket: Socket) { }

  sendMessage(data: MessageData) {
    this.socket.emit('messageToServer', data);
  }

  getMessage() {
    return this.socket.fromEvent<MessageData>('globalChatMessage');
  }
}
