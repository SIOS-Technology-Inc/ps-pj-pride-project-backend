import { Module } from '@nestjs/common';
import { PrideUserController } from './pride-user.controller';
import { PrideUserService } from './pride-user.service';

@Module({
  controllers: [PrideUserController],
  providers: [PrideUserService],
})
export class PrideUserModule {}
