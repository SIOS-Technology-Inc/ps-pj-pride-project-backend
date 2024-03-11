import { Module } from '@nestjs/common';
import { PrideController } from './pride.controller';
import { PrideService } from './pride.service';

@Module({
  controllers: [PrideController],
  providers: [PrideService]
})
export class PrideModule {}
