import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoutine from './routine.reducer';

export const selectRoutineState = createFeatureSelector<fromRoutine.RoutineState>(
  fromRoutine.routineFeatureKey
);

export const selectRoutines = createSelector(selectRoutineState, (state) => state.routines);
export const selectIsLoading = createSelector(selectRoutineState, (state) => state.isLoading);
