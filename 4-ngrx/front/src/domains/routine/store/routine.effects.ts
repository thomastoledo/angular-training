import { effect, inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { RoutineApiActions, RoutinePageActions } from './routine.actions';
import { RoutineService } from '../routine.service';

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
            return RoutineApiActions.fetchRoutinesSuccess({ routines });
          }),
          catchError((error) => {
            return of(RoutineApiActions.fetchRoutineFailure({ error }));
          })
        );
      })
    );
  });
}
