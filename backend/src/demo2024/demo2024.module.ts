import { Module } from '@nestjs/common';
import { Demo2024Controller } from './demo2024.controller';
import { Demo2024Service } from './demo2024.service';

@Module({
  providers: [Demo2024Service],
  controllers: [Demo2024Controller],
})
export class Demo2024Module {}
