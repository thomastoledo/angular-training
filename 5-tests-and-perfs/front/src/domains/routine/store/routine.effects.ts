import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RoutineService } from '../routine.service';
import { RoutinePageActions, RoutineApiActions } from './routine.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class RoutineEffects {
  private readonly actions$ = inject(Actions);
  private readonly service = inject(RoutineService);

  loadRoutines$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoutinePageActions.enter),
      mergeMap(() =>
        this.service.getRoutines().pipe(
          map((data) => RoutineApiActions.loadSuccess({ data })),
          catchError((error) => of(RoutineApiActions.loadFailure({ error })))
        )
      )
    )
  );
}
