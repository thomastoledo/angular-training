import { Module } from '@nestjs/common';
import { RoutineStatusController } from './routine-status.controller';
import { RoutineStatusService } from './routine-status.service';
import { RoutineModule } from 'src/routine/routine.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutineStatus } from './entities/routine-status.entity';
import { CronJobsService } from './cronjobs/cronjobs.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoutineStatus]), RoutineModule],
  controllers: [RoutineStatusController],
  providers: [RoutineStatusService, CronJobsService],
})
export class RoutineStatusModule {}
