import { CreateRoutineDto, PatchRoutineDto, RoutineDto } from "@domain/routine/routine.model";
import { RoutineFormGroupValues } from "../routine-form/routine-form.factory";

export function toCreateDto(values: RoutineFormGroupValues): CreateRoutineDto {
  if (
    !values.name ||
    !values.startingDate ||
    !values.endingDate ||
    !values.reccurence ||
    values.reccurenceCoef == null
  ) {
    throw new Error('Cannot convert to DTO: missing required values.');
  }

  return {
    name: values.name,
    description: values.description ?? '',
    startingDate: new Date(values.startingDate),
    endingDate: new Date(values.endingDate),
    reccurence: values.reccurence,
    reccurenceCoef: values.reccurenceCoef,
  };
}

export function toPatchDto(
  original: RoutineDto,
  values: RoutineFormGroupValues
): PatchRoutineDto {
  const dto: PatchRoutineDto = {};

  if (values.name != null && values.name !== original.name) {
    dto.name = values.name;
  }

  if (values.description != null && values.description !== original.description) {
    dto.description = values.description;
  }

  if (
    values.startingDate != null &&
    new Date(values.startingDate).getTime() !== new Date(original.startingDate).getTime()
  ) {
    dto.startingDate = new Date(values.startingDate);
  }

  if (
    values.endingDate != null &&
    new Date(values.endingDate).getTime() !== new Date(original.endingDate).getTime()
  ) {
    dto.endingDate = new Date(values.endingDate);
  }

  if (values.reccurence != null && values.reccurence !== original.reccurence) {
    dto.reccurence = values.reccurence;
  }

  if (
    values.reccurenceCoef != null &&
    values.reccurenceCoef !== original.reccurenceCoef
  ) {
    dto.reccurenceCoef = values.reccurenceCoef;
  }

  return dto;
}
