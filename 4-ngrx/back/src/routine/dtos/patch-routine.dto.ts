import { PartialType } from '@nestjs/mapped-types';
import { CreateRoutineDto } from './create-routine.dto';
export class PatchRoutineDto extends PartialType(CreateRoutineDto) {}
