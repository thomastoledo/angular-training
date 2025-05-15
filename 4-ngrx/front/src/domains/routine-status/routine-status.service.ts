import { ToggleOccurrenceDoneDto } from './../../../../back/src/routine-status/dtos/toggle-occurence-done.dto';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoutineStatusDto } from './routine-status.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class RoutineStatusService {
  private readonly baseUrl = environment.baseUrl;
  private readonly httpClient = inject(HttpClient);

  getStatuses(): Observable<RoutineStatusDto[]> {
    return this.httpClient.get<RoutineStatusDto[]>(
      `${this.baseUrl}/routine-status/`
    );
  }

  getStatusByRoutineId(routineId: string): Observable<RoutineStatusDto[]> {
    return this.httpClient.get<RoutineStatusDto[]>(
      `${this.baseUrl}/routine-status/${routineId}`
    );
  }

  toggleOccurrenceDone(
    dto: ToggleOccurrenceDoneDto
  ): Observable<RoutineStatusDto[]> {
    return this.httpClient.post<RoutineStatusDto[]>(
      `${this.baseUrl}/routine-status/toggleOccurenceDone`,
      dto
    );
  }
}
