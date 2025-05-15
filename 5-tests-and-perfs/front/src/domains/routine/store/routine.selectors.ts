import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RoutineState } from './routine.reducer';

export const selectRoutineState = createFeatureSelector<RoutineState>('routine');

export const selectAllRoutines = createSelector(
  selectRoutineState,
  (state) => state.data
);

export const selectRoutineLoading = createSelector(
  selectRoutineState,
  (state) => state.loading
);

export const selectRoutineError = createSelector(
  selectRoutineState,
  (state) => state.error
);
