import {
  Controller,
  Get,
  Param,
  Post,
  ParseIntPipe,
  NotFoundException,
  Body,
} from '@nestjs/common';
import { RoutineStatusService } from './routine-status.service';
import { RoutineStatus } from './entities/routine-status.entity'
import { ToggleOccurrenceDoneDto } from './dtos/toggle-occurence-done.dto';

@Controller('api/routine-status/')
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

  @Post('toggleOccurenceDone')
  public async toggleOccurrenceDone(
    @Body() dto: ToggleOccurrenceDoneDto
  ): Promise<RoutineStatus> {
    const routineStatus = await this.statusService.toggleOccurenceDone(dto.routineId, dto.index, dto.done);
    if (!routineStatus) {
      throw new NotFoundException(`Routine with id ${dto.routineId} not found.`);
    }
    return routineStatus;
  }
}
