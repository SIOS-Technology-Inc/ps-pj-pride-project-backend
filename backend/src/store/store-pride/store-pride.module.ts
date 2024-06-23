import { Global, Module } from '@nestjs/common';
import { StorePrideService } from './store-pride.service';

@Global()
@Module({
  providers: [StorePrideService],
  exports: [StorePrideService],
})
export class StorePrideModule {}
