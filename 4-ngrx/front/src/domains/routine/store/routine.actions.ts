import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { RoutineDto } from '../routine.model';

export const RoutinePageActions = createActionGroup({
  source: 'Routine Page',
  events: {
    enter: emptyProps(),
  },
});

export const RoutineApiActions = createActionGroup({
  source: 'Routine API',
  events: {
    loadSuccess: props<{ data: RoutineDto[] }>(),
    loadFailure: props<{ error: unknown }>(),
  },
});
