import { Controller, MessageEvent, Post, Sse, UseGuards } from '@nestjs/common';
import { Observable, map, tap } from 'rxjs';
import { GoogleIdTokenVerifyGrantIdGuard } from 'src/common/guard/google-id-token-verify-grant-id/google-id-token-verify-grant-id.guard';
import { ChatService } from './chat.service';

@Controller('api/sse')
@UseGuards(GoogleIdTokenVerifyGrantIdGuard)
export class ChatController {
  constructor(private readonly service: ChatService) {}
  // https://sayanbiswas.hashnode.dev/implementing-real-time-chat-messaging-with-nestjs-server-sent-events-and-nestjs-event-emitters
  // https://iliabedian.com/blog/server-side-events-on-nestjs-emitting-events-to-clients
  @Post('test')
  getTest(): string {
    this.service.createMessage('chatId', 'text');
    return 'test';
  }

  @Sse('stream')
  sse(): Observable<MessageEvent> {
    return this.service.getMessageStream().pipe(
      map((message) => ({ data: JSON.stringify(message) })),
      tap((data) => console.log(data)),
    );
  }
}
