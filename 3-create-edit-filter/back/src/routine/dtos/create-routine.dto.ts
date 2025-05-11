import { ApiProperty } from '@nestjs/swagger';
export class CreateRoutineDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    startingDate: Date;
    @ApiProperty()
    endingDate: Date;
    @ApiProperty()
    reccurence: 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
    @ApiProperty()
    reccurenceCoef: number;
}