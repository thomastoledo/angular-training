import { Routine } from './entities/routine.entity';
import { Repository } from 'typeorm';
import { CreateRoutineDto } from './dtos/create-routine.dto';
import { PatchRoutineDto } from './dtos/patch-routine.dto';
export declare class RoutineService {
    private readonly routineRepository;
    constructor(routineRepository: Repository<Routine>);
    getRoutines(): Promise<Routine[]>;
    getRoutineById(id: string): Promise<Routine | null>;
    createRoutine(dto: CreateRoutineDto): Promise<Routine>;
    patchRoutine(id: string, dto: Partial<PatchRoutineDto>): Promise<Routine>;
    deleteRoutine(id: string): Promise<void>;
}
