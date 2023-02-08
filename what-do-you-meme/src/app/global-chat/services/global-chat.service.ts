import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { messageData } from '../models/messageData';

@Injectable({
  providedIn: 'root',
})
export class GlobalChatService {
  constructor(private socket: Socket) {}

  sendMessage(data: messageData) {
    this.socket.emit('message', data);
  }

  getMessage() {
    return this.socket.fromEvent<messageData>('message').pipe(map((data) => {
      console.log(data);
    }));
  }
}
