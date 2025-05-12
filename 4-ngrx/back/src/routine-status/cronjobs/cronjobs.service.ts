import { Cron, CronExpression } from '@nestjs/schedule';
import { Injectable } from '@nestjs/common';
import { RoutineStatusService } from '../routine-status.service';

@Injectable()
export class CronJobsService {
  constructor(private readonly statusService: RoutineStatusService) {}

  // @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  @Cron('*/10 * * * * *')
  async handleStatusReset() {
    await this.statusService.resetAllStatusesIfPeriodExpired();
  }
}
