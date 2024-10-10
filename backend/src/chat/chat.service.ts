import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Message } from 'firebase-admin/lib/messaging/messaging-api';
import { Observable } from 'rxjs';

@Injectable()
export class ChatService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  createMessage(chatId: string, text: string) {
    this.eventEmitter.emit('messageCreated', { message: text, randomNumber: Math.floor(Math.random() * 100) });
  }

  getMessageStream(): Observable<Message> {
    return new Observable((subscriber) => {
      const listener = (message: Message) => subscriber.next(message);
      this.eventEmitter.on('messageCreated', listener);
      return () => this.eventEmitter.off('messageCreated', listener);
    });
  }
}
