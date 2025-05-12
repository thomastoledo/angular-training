export interface RoutineDto {
  id: string;
  name: string;
  description: string;
  startingDate: Date;
  endingDate: Date;
  reccurence: 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
  reccurenceCoef: number;
}

// TODO: DTOs for create routine and patch routine