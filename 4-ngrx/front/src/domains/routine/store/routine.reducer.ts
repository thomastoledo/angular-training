import { createReducer, on } from '@ngrx/store';
import { RoutineDto } from '../routine.model';
import { RoutineApiActions, RoutinePageActions } from './routine.actions';

export interface RoutineState {
  data: RoutineDto[];
  loading: boolean;
  error: unknown;
}

export const initialState: RoutineState = {
  data: [],
  error: null,
  loading: false,
};

export const routineReducer = createReducer(
  initialState,

  on(RoutinePageActions.enter, (state) => ({
    ...state,
    loading: true,
  })),

  on(RoutineApiActions.loadSuccess, (state, { data }) => ({
    ...state,
    data,
    loading: false,
    error: null,
  })),

  on(RoutineApiActions.loadFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
