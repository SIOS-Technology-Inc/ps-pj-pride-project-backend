import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { EnvironmentsModule } from './config/enviroments.module';
import { PrideUserModule } from './pride-user/pride-user.module';
import { PrideModule } from './pride/pride.module';
import { PromptAoaiModule } from './prompt-aoai/prompt-aoai.module';
import { StorePrideModule } from './store/store-pride/store-pride.module';
import { Demo2024Module } from './demo2024/demo2024.module';

@Module({
  imports: [
    EnvironmentsModule,
    EventEmitterModule.forRoot(),
    PrideModule,
    PrideUserModule,
    StorePrideModule,
    ChatModule,
    PromptAoaiModule,
    Demo2024Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
