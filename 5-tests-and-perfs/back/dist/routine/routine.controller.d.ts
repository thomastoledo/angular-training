import { RoutineService } from './routine.service';
import { Routine } from './entities/routine.entity';
import { CreateRoutineDto } from './dtos/create-routine.dto';
import { PatchRoutineDto } from './dtos/patch-routine.dto';
export declare class RoutineController {
    private readonly routineService;
    constructor(routineService: RoutineService);
    getRoutines(): Promise<Routine[]>;
    getRoutine(id: string): Promise<Routine>;
    createRoutine(dto: CreateRoutineDto): Promise<Routine>;
    updateRoutine(id: string, dto: Partial<PatchRoutineDto>): Promise<Routine>;
    deleteRoutine(id: string): Promise<void>;
}
