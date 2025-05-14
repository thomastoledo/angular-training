import { Routine } from 'src/routine/entities/routine.entity';
export declare class RoutineStatus {
    id: string;
    routine: Routine;
    routineId: string;
    doneOccurrences: number[];
    timestamp: string;
    periodKey: string;
}
