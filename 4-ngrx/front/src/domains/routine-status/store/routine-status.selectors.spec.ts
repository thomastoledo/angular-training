import * as fromRoutineStatus from './routine-status.reducer';
import { selectRoutineStatusState } from './routine-status.selectors';

describe('RoutineStatus Selectors', () => {
  it('should select the feature state', () => {
    const result = selectRoutineStatusState({
      [fromRoutineStatus.routineStatusFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
