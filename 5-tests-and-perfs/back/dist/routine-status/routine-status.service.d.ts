import { RoutineStatus } from './entities/routine-status.entity';
import { Repository } from 'typeorm';
import { RoutineService } from 'src/routine/routine.service';
export declare class RoutineStatusService {
    private readonly statusRepository;
    private readonly routineService;
    constructor(statusRepository: Repository<RoutineStatus>, routineService: RoutineService);
    private getPeriodKey;
    getAll(): Promise<RoutineStatus[]>;
    getByRoutineId(routineId: string): Promise<RoutineStatus | null>;
    toggleOccurenceDone(routineId: string, index: number, done: boolean): Promise<RoutineStatus | null>;
    resetAllStatusesIfPeriodExpired(): Promise<void>;
}
