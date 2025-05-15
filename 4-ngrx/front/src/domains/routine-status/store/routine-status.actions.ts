import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RoutineStatusDto } from '../routine-status.model';

export const RoutineStatusPageActions = createActionGroup({
  source: 'RoutineStatusPage',
  events: {
    fetchRoutinesStatus: emptyProps(),
    toggleOccurenceDone: props<{routineId: string; index: number; done: boolean}>()
  }
});

export const RoutineStatusApiActions = createActionGroup({
  source: 'RoutineStatusApi',
  events: {
    fetchRoutineStatusSuccess: props<{statuses: RoutineStatusDto[]}>(),
    fetchRoutineStatusFailure: props<{error: Error}>(),
  }
});
