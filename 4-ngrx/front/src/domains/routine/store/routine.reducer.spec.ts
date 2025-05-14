import { routineReducer, initialState } from './routine.reducer';

describe('Routine Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = routineReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
