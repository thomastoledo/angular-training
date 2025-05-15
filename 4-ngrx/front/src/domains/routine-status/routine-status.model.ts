export interface RoutineStatusDto {
  id: string;
  routineId: string;
  doneOccurrences: number[];
  timestamp: string;
  periodKey: string;
}
