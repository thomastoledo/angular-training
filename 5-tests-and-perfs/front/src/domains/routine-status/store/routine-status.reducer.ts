import { createReducer, on } from '@ngrx/store';
import { RoutineStatusDto } from '../routine-status.model';
import { RoutineStatusApiActions, RoutineStatusPageActions } from './routine-status.actions';

export interface RoutineStatusState {
  data: RoutineStatusDto[];
  loading: boolean;
  error: unknown;
}

export const initialState: RoutineStatusState = {
  data: [],
  error: null,
  loading: false,
};

export const routineStatusReducer = createReducer(
  initialState,
  on(RoutineStatusPageActions.enter, (state) => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(RoutineStatusApiActions.loadSuccess, (state, { data }) => ({
    ...state,
    data,
    loading: false,
    error: null,
  })),
  on(RoutineStatusApiActions.loadFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
