import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RoutineStatusService } from '../routine-status.service';
import { RoutineStatusPageActions, RoutineStatusApiActions } from './routine-status.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class RoutineStatusEffects {
  private readonly actions$ = inject(Actions);
  private readonly service = inject(RoutineStatusService);

  loadStatuses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoutineStatusPageActions.enter),
      mergeMap(() =>
        this.service.getAllStatuses().pipe(
          map((data) => RoutineStatusApiActions.loadSuccess({ data })),
          catchError((error) => of(RoutineStatusApiActions.loadFailure({ error })))
        )
      )
    )
  );
}
