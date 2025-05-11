import { ApiProperty } from '@nestjs/swagger';
export interface CreateRoutineDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    startingDate: Date;
    @ApiProperty()
    endingDate: Date;
    @ApiProperty()
    reccurence: 'minute' | 'hour' | 'day' | 'week' | 'monsth' | 'year';
    @ApiProperty()
    reccurenceCoef: number;
}