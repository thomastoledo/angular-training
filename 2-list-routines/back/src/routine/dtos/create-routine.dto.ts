export interface CreateRoutineDto {
    name: string;
    description: string;
    startingDate: Date;
    endingDate: Date;
    reccurence: 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
    reccurenceCoef: number;
}