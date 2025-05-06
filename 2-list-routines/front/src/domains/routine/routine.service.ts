import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { RoutineDto } from './routine.model';
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
}