import { Module } from '@nestjs/common';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvironmentsModule } from './config/enviroments.module';
import { PrideUserModule } from './pride-user/pride-user.module';
import { PrideModule } from './pride/pride.module';

@Module({
  imports: [
    EnvironmentsModule,
    PrideModule,
    PrideUserModule,
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'prod',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
