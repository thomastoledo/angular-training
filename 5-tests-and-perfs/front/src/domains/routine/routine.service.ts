import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { CreateRoutineDto, RoutineDto } from './routine.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoutineService {
  private readonly baseUrl = environment.baseUrl;
  private readonly httpClient = inject(HttpClient);

  getRoutines(): Observable<RoutineDto[]> {
    return this.httpClient.get<RoutineDto[]>(`${this.baseUrl}/routine/list`);
  }

  createRoutine(dto: CreateRoutineDto): Observable<RoutineDto> {
    return this.httpClient.post<RoutineDto>(`${this.baseUrl}/routine`, dto);
  }

  patchRoutine(id: string, dto: Partial<CreateRoutineDto>): Observable<RoutineDto> {
    return this.httpClient.patch<RoutineDto>(`${this.baseUrl}/routine/${id}`, dto);
  }

  deleteRoutine(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/routine/${id}`);
  }

  getRoutineById(id: string): Observable<RoutineDto> {
    return this.httpClient.get<RoutineDto>(`${this.baseUrl}/routine/${id}`);
  }
}
