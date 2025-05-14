import { createFeature, createReducer, on } from '@ngrx/store';
import { RoutineApiActions, RoutinePageActions } from './routine.actions';
import { RoutineDto } from '../routine.model';

export const routineFeatureKey = 'routine';

export interface RoutineState {
  routines: RoutineDto[];
  isLoading: boolean;
  error: Error | null;
}

export const initialState: RoutineState = {
  routines: [],
  isLoading: false,
  error: null
};

export const routineReducer = createReducer(
  initialState,
  on(RoutinePageActions.fetchRoutines, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(RoutineApiActions.fetchRoutinesSuccess, (state, action) => {
    return {
      ...state,
      routines: action.routines,
      isLoading: false,
      error: null,
    };
  }),
  on(RoutineApiActions.fetchRoutineFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error
    };
  })
);

export const routineFeature = createFeature({
  name: routineFeatureKey,
  reducer: routineReducer,
});
