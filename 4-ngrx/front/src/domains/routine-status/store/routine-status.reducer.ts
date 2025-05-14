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
  error: null,
};

export const routineStatusReducer = createReducer(
  initialState,
  on(RoutineStatusPageActions.fetchRoutineStatuses, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(RoutineStatusApiActions.fetchRoutinesStatusesSuccess, (state, action) => {
    return {
      ...state,
      statuses: action.statuses,
      isLoading: false,
      error: null,
    };
  }),
  on(
    RoutineStatusApiActions.fetchRoutineStatusesFailure,
    RoutineStatusApiActions.toggleOccurrenceDoneFailure,
    (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    }
  ),
  on(RoutineStatusApiActions.toggleOccurrenceDoneSuccess, (state, action) => {
    return {
      ...state,
      statuses: state.statuses.map((status) =>
        status.id === action.status.id ? action.status : status
      ),
      isLoading: false,
      error: null,
    };
  })
);

export const routineStatusFeature = createFeature({
  name: routineStatusFeatureKey,
  reducer: routineStatusReducer,
});
