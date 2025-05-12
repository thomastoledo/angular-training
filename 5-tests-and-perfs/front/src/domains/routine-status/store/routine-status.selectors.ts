import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RoutineStatusState } from './routine-status.reducer';

export const selectRoutineStatusState = createFeatureSelector<RoutineStatusState>('routineStatus');

export const selectAllStatuses = createSelector(
  selectRoutineStatusState,
  (state) => state.data
);
