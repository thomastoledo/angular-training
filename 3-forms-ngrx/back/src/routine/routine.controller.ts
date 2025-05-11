import { Controller, Get } from '@nestjs/common';
import { RoutineService } from './routine.service';
import { Routine } from './entities/routine.entity';

@Controller('api/routine')
export class RoutineController {
    constructor(private readonly routineService: RoutineService) {}

    @Get('/list')
    public getRoutines(): Promise<Routine[]> {
        return this.routineService.getRoutines();
    }
}


