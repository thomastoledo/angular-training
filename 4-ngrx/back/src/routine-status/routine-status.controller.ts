import {
  Controller,
  Get,
  Param,
  Post,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { RoutineStatusService } from './routine-status.service';
import { RoutineStatus } from './entities/routine-status.entity'

@Controller('api/routine-status')
export class RoutineStatusController {
  constructor(private readonly statusService: RoutineStatusService) {}

  @Get()
  public getAllStatuses(): Promise<RoutineStatus[]> {
    return this.statusService.getAll();
  }

  @Get(':routineId')
  public async getStatusByRoutineId(@Param('routineId') routineId: string): Promise<RoutineStatus> {
    const routineStatus = await this.statusService.getByRoutineId(routineId);
    if (!routineStatus) {
      throw new NotFoundException(`Routine with id ${routineId} not found.`);
    }
    return routineStatus;
  }

  @Post(':routineId/occurrence/:index')
  public async markOccurrenceDone(
    @Param('routineId') routineId: string,
    @Param('index', ParseIntPipe) index: number,
  ): Promise<RoutineStatus> {
    const routineStatus = await this.statusService.markOccurrenceDone(routineId, index);
    if (!routineStatus) {
      throw new NotFoundException(`Routine with id ${routineId} not found.`);
    }
    return routineStatus;
  }
}
