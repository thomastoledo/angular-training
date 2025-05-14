import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RoutineDto } from '../routine.model';

export const RoutinePageActions = createActionGroup({
  source: 'RoutinePage',
  events: {
    fetchRoutines: emptyProps()
  }
});

export const RoutineApiActions = createActionGroup({
  source: 'RoutineApi',
  events: {
    fetchRoutinesSuccess: props<{routines: RoutineDto[]}>(),
    fetchRoutineFailure: props<{error: Error}>(),
  }
})