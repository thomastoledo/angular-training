import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import { RoutineService } from './routine.service';
import { Routine } from './entities/routine.entity';
import { CreateRoutineDto } from './dtos/create-routine.dto';
import { PatchRoutineDto } from './dtos/patch-routine.dto';

@Controller('api/routine')
export class RoutineController {
  constructor(private readonly routineService: RoutineService) {}

  @Get('/list')
  public getRoutines(): Promise<Routine[]> {
    return this.routineService.getRoutines();
  }

  @Get('/:id')
  public async getRoutine(@Param('id') id: string): Promise<Routine> {
    const routine = await this.routineService.getRoutine(id);
    if (!routine) {
      throw new NotFoundException(`Routine with id ${id} not found.`);
    }
    return routine;
  }

  @Post()
  public createRoutine(@Body() dto: CreateRoutineDto): Promise<Routine> {
    return this.routineService.createRoutine(dto);
  }

  @Patch('/:id')
  public updateRoutine(
    @Param('id') id: string,
    @Body() dto: Partial<PatchRoutineDto>,
  ): Promise<Routine> {
    return this.routineService.patchRoutine(id, dto);
  }

  @Delete('/:id')
  public deleteRoutine(@Param('id') id: string): Promise<void> {
    return this.routineService.deleteRoutine(id);
  }
}
