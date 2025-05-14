import { RoutineStatusService } from './routine-status.service';
import { RoutineStatus } from './entities/routine-status.entity';
import { ToggleOccurrenceDoneDto } from './dtos/toggle-occurence-done.dto';
export declare class RoutineStatusController {
    private readonly statusService;
    constructor(statusService: RoutineStatusService);
    getAllStatuses(): Promise<RoutineStatus[]>;
    getStatusByRoutineId(routineId: string): Promise<RoutineStatus>;
    markOccurrenceDone(dto: ToggleOccurrenceDoneDto): Promise<RoutineStatus>;
}
