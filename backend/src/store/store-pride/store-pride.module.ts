import { Module } from '@nestjs/common';
import { StorePrideService } from './store-pride.service';

@Module({
  providers: [StorePrideService],
  exports: [StorePrideService],
})
export class StorePrideModule {}
