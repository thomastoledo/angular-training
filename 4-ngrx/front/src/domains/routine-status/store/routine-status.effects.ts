import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  RoutineStatusPageActions,
  RoutineStatusApiActions,
} from './routine-status.actions';
import { RoutineStatusService } from '../routine-status.service';

@Injectable()
export class RoutineStatusEffects {
  private readonly actions$ = inject(Actions);
  private readonly routineStatusService = inject(RoutineStatusService);

  fetchRoutineStatuses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RoutineStatusPageActions.fetchRoutineStatuses),
      switchMap(() => {
        return this.routineStatusService.getStatuses().pipe(
          map((routines) => {
            return RoutineStatusApiActions.fetchRoutinesStatusesSuccess({
              statuses: routines,
            });
          }),
          catchError((error) => {
            return of(
              RoutineStatusApiActions.fetchRoutineStatusesFailure({ error })
            );
          })
        );
      })
    );
  });

  toggleOccurrenceDone$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RoutineStatusPageActions.toggleOccurrenceDone),
      switchMap(({routineId, done, index}) => {
        return this.routineStatusService.toggleOccurrenceDone({routineId, done, index}).pipe(
          map((status) => {
            return RoutineStatusApiActions.toggleOccurrenceDoneSuccess({
              status,
            });
          }),
          catchError((error) => {
            return of(
              RoutineStatusApiActions.toggleOccurrenceDoneFailure({ error })
            );
          })
        );
      })
    );
  });
}
