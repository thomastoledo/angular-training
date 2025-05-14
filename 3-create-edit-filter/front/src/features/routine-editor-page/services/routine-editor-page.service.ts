import { inject, Injectable } from '@angular/core';
import { CreateRoutineDto, PatchRoutineDto, RoutineDto } from '@domain/routine/routine.model';
import { RoutineService } from '@domain/routine/routine.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutineEditorPageService {
  private readonly routineService = inject(RoutineService);
  getRoutine(id: string): Observable<RoutineDto> {
    return this.routineService.getRoutine(id);
  }

  createRoutine(createRoutineDto: CreateRoutineDto): Observable<RoutineDto> {
    return this.routineService.createRoutine(createRoutineDto);
  }

  patchRoutine(id: string, patchRoutineDto: PatchRoutineDto): Observable<RoutineDto> {
    return this.routineService.patchRoutine(id, patchRoutineDto);
  }
}
