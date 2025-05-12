import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RoutineStatusDto } from './routine-status.model';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class RoutineStatusService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.baseUrl;
  

  getAllStatuses(): Observable<RoutineStatusDto[]> {
    return this.http.get<RoutineStatusDto[]>(`${this.baseUrl}/routine-status`);
  }

  getStatusByRoutineId(routineId: string): Observable<RoutineStatusDto> {
    return this.http.get<RoutineStatusDto>(`${this.baseUrl}/routine-status/getByRoutineId/${routineId}`);
  }

  toggleOccurrenceDone(routineId: string, index: number, done: boolean): Observable<RoutineStatusDto> {
    return this.http.post<RoutineStatusDto>(`${this.baseUrl}/routine-status/toggleOccurenceDone`, {
      routineId,
      index,
      done
    });
  }
}
