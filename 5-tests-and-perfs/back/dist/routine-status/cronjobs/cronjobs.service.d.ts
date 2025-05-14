import { RoutineStatusService } from '../routine-status.service';
export declare class CronJobsService {
    private readonly statusService;
    constructor(statusService: RoutineStatusService);
    handleStatusReset(): Promise<void>;
}
