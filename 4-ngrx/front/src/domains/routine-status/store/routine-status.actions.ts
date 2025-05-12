import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { RoutineStatusDto } from '../routine-status.model';

export const RoutineStatusPageActions = createActionGroup({
  source: 'RoutineStatus Page',
  events: {
    enter: emptyProps(),
    toggleOccurrence: props<{routineId: string, index: number, done: boolean}>() 
  },
});

export const RoutineStatusApiActions = createActionGroup({
  source: 'RoutineStatus API',
  events: {
    loadSuccess: props<{ data: RoutineStatusDto[] }>(),
    loadFailure: props<{ error: unknown }>(),
  },
});
