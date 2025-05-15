import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { RoutineStatusService } from '../routine-status.service';
import { RoutineStatusApiActions, RoutineStatusPageActions } from './routine-status.actions';

@Injectable()
export class RoutineStatusEffects {
  private readonly actions$ = inject(Actions);

  private readonly routineStatusService = inject(RoutineStatusService);

  fetchRoutines$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RoutineStatusPageActions.fetchRoutinesStatus),
      switchMap(() => {
        return this.routineStatusService.getStatuses().pipe(
          map((statuses) => {
            return RoutineStatusApiActions.fetchRoutineStatusSuccess({ statuses });
          }),
          catchError((error) => {
            return of(RoutineStatusApiActions.fetchRoutineStatusFailure({ error }));
          })
        );
      })
    );
  });

  toggleOccurenceDone$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RoutineStatusPageActions.toggleOccurenceDone),
      switchMap(({routineId, done, index}) => {
        return this.routineStatusService.toggleOccurrenceDone({routineId, done, index}).pipe(
          map((routines) => {
            return RoutineStatusApiActions.fetchRoutineStatusSuccess({
              statuses: routines,

             });
          }),
          catchError((error) => {
            return of(RoutineStatusApiActions.fetchRoutineStatusFailure({ error }));
          })
        );
      })
    );
  });

}
