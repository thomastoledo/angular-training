export interface RoutineStatusDto {
  id: string;
  routineId: string;
  doneOccurrences: number[];
  timestamp: string;
  periodKey: string;
}

export interface ToggleOccurrenceDoneDto {
  routineId: string;
  index: number;
  done: boolean;
}
