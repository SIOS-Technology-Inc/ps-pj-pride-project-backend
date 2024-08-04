import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvironmentsModule } from './config/enviroments.module';
import { PrideUserModule } from './pride-user/pride-user.module';
import { PrideModule } from './pride/pride.module';
import { StorePrideModule } from './store/store-pride/store-pride.module';

@Module({
  imports: [EnvironmentsModule, PrideModule, PrideUserModule, StorePrideModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
