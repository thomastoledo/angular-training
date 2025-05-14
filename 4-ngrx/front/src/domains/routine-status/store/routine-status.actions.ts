import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RoutineStatusDto } from '../routine-status.model';

export const RoutineStatusPageActions = createActionGroup({
  source: 'RoutineStatusPage',
  events: {
    fetchRoutineStatuses: emptyProps(),
    toggleOccurrenceDone: props<{routineId: string; index: number; done: boolean}>()
  }
});

export const RoutineStatusApiActions = createActionGroup({
  source: 'RoutineStatusApi',
  events: {
    fetchRoutinesStatusesSuccess: props<{statuses: RoutineStatusDto[]}>(),
    fetchRoutineStatusesFailure: props<{error: Error}>(),
    toggleOccurrenceDoneSuccess: props<{status: RoutineStatusDto}>(),
    toggleOccurrenceDoneFailure: props<{error: Error}>(),
  }
})