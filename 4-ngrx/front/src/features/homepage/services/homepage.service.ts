import { inject, Injectable } from '@angular/core';
import { RoutineDto } from '@domain/routine/routine.model';
import { RoutineService } from '@domain/routine/routine.service';
import { map, Observable } from 'rxjs';

type RoutineDtoWithListOccurences = RoutineDto & {listOccurences: number[]};

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  private readonly routineService = inject(RoutineService);
  
  getRoutines(): Observable<RoutineDtoWithListOccurences[]> {
    return this.routineService.getRoutines().pipe(
      map((routines) => routines.map((routine) => {
        return {...routine, listOccurences: Array.from({length: routine.reccurenceCoef}, (_, i) => i)}
      }))
    );
  }
}
