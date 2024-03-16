import { Module } from '@nestjs/common';
import { UtilitiesModule } from 'src/utilities/utilities.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [UtilitiesModule],
})
export class UsersModule {}
