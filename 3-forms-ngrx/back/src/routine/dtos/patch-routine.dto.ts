import { PartialType } from '@nestjs/mapped-types';
import { CreateRoutineDto } from './create-routine.dto';
export interface PatchRoutineDto extends PartialType(CreateRoutine) {}
