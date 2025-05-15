import { inject, Injectable } from '@angular/core';
import { CreateRoutineDto, PatchRoutineDto, RoutineDto } from '@domain/routine/routine.model';
import { RoutineService } from '@domain/routine/routine.service';
import { Observable } from 'rxjs';
import { RoutineFormGroupValues } from '../routine-form/routine-form.factory';
import { toCreateDto, toPatchDto } from '../mappers/routine-form-mapper';

@Injectable({
  providedIn: 'root',
})
export class RoutineEditorPageService {
  private readonly routineService = inject(RoutineService);
  constructor() {}

  getRoutine(id: string): Observable<RoutineDto> {
    return this.routineService.getRoutine(id);
  }

  createRoutine(
    formGroupValues: RoutineFormGroupValues
  ): Observable<RoutineDto> {
    const dto: CreateRoutineDto = toCreateDto(formGroupValues);
    return this.routineService.createRoutine(dto);
  }

  patchRoutine(
    id: string,
    initialRoutine: RoutineDto,
    formGroupValues: RoutineFormGroupValues
  ): Observable<RoutineDto> {
    const dto: PatchRoutineDto = toPatchDto(initialRoutine, formGroupValues);
    return this.routineService.patchRoutine(id, dto);
  }
}
