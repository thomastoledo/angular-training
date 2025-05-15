export interface RoutineDto {
  id: string;
  name: string;
  description: string;
  startingDate: Date;
  endingDate: Date;
  reccurence: 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
  reccurenceCoef: number;
}

export interface CreateRoutineDto extends Omit<RoutineDto, 'id'> {}
export interface PatchRoutineDto extends Partial<CreateRoutineDto> {}

