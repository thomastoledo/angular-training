import { inject, Injectable } from '@angular/core';
import { RoutineDto } from '@domain/routine/routine.model';
import { RoutineService } from '@domain/routine/routine.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  private readonly routineService = inject(RoutineService);
  
  getRoutines(): Observable<RoutineDto[]> {
    return this.routineService.getRoutines();
  }
}
