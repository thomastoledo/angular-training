import * as fromRoutine from './routine.reducer';
import { selectRoutineState } from './routine.selectors';

describe('Routine Selectors', () => {
  it('should select the feature state', () => {
    const result = selectRoutineState({
      [fromRoutine.routineFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
