import { inject, Injectable } from '@angular/core';
import { RoutineDto } from 'domains/routine/routine.model';
import { RoutineService } from 'domains/routine/routine.service';
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
