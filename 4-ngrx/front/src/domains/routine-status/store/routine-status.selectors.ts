import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoutineStatus from './routine-status.reducer';

export const selectRoutineStatusState = createFeatureSelector<fromRoutineStatus.State>(
  fromRoutineStatus.routineStatusFeatureKey
);

export const selectRoutinesStatuses = createSelector(selectRoutineStatusState, (state) => state.statuses);
export const selectIsLoading = createSelector(selectRoutineStatusState, (state) => state.isLoading);