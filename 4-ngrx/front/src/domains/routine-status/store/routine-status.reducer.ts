import { createFeature, createReducer, on } from '@ngrx/store';
import {
  RoutineStatusApiActions,
  RoutineStatusPageActions,
} from './routine-status.actions';
import { RoutineStatusDto } from '../routine-status.model';
export const routineStatusFeatureKey = 'routineStatus';

export interface State {
  statuses: RoutineStatusDto[];
  isLoading: boolean;
  error: Error | null;
}

export const initialState: State = {
  statuses: [],
  isLoading: false,
  error: null
};

export const routineStatusReducer = createReducer(
  initialState,
  on(RoutineStatusPageActions.fetchRoutinesStatus, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(RoutineStatusApiActions.fetchRoutineStatusSuccess, (state, action) => {
    return {
      ...state,
      statuses: action.statuses,
      isLoading: false,
      error: null,
    };
  }),
  on(RoutineStatusApiActions.fetchRoutineStatusFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),
);

export const routineStatusFeature = createFeature({
  name: routineStatusFeatureKey,
  reducer: routineStatusReducer,
});
