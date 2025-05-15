import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { RoutineService } from '../routine.service';
import { RoutineApiActions, RoutinePageActions } from './routine.actions';

@Injectable()
export class RoutineEffects {
  private readonly actions$ = inject(Actions);

  private readonly routineService = inject(RoutineService);

  fetchRoutines$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RoutinePageActions.fetchRoutines),
      switchMap(() => {
        return this.routineService.getRoutines().pipe(
          map((routines) => {
            return RoutineApiActions.fetchRoutineSucces({ routines });
          }),
          catchError((error) => {
            return of(RoutineApiActions.fetchRoutineFailure({ error }));
          })
        );
      })
    );
  });
}
