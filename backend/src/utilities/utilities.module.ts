import { Module } from '@nestjs/common';
import { UtilitiesController } from './utilities.controller';
import { UtilitiesService } from './utilities.service';
import { SlController } from './sl/sl.controller';
import { ManagerController } from './manager/manager.controller';
import { SkillController } from './skill/skill.controller';
import { QualificationController } from './qualification/qualification.controller';

@Module({
  controllers: [UtilitiesController, SlController, ManagerController, SkillController, QualificationController],
  providers: [UtilitiesService],
  exports: [UtilitiesService],
})
export class UtilitiesModule {}
