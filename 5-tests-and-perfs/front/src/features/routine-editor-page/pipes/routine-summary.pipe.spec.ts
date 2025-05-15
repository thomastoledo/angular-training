import { describe, it, expect } from 'vitest';
import { RoutineSummaryPipe } from './routine-summary.pipe';

describe('RoutineSummaryPipe', () => {
  const pipe = new RoutineSummaryPipe();

  it('should return "Waiting for user input…" when no fields are provided', () => {
    const result = pipe.transform({});
    expect(result).toBe('Waiting for user input…');
  });

  it('should return name with waiting message if only name is provided', () => {
    const result = pipe.transform({ name: 'Workout' });
    expect(result).toBe('Workout - waiting for other fields to be filled…');
  });

  it('should format name and recurrence', () => {
    const result = pipe.transform({
      name: 'Workout',
      reccurence: 'day',
      reccurenceCoef: 2,
    });
    expect(result).toBe('Workout - 2 time(s) per day');
  });

  it('should include date range when starting and ending dates are provided', () => {
    const result = pipe.transform({
      name: 'Workout',
      reccurence: 'week',
      reccurenceCoef: 3,
      startingDate: new Date('2025-05-01'),
      endingDate: new Date('2025-05-07'),
    });
    expect(result).toBe(
      'Workout - 3 time(s) per week - from 2025-05-01 to 2025-05-07'
    );
  });

  it('should support Date objects as dates', () => {
    const result = pipe.transform({
      name: 'Workout',
      startingDate: new Date('2025-05-01'),
      endingDate: new Date('2025-05-07'),
    });
    expect(result).toBe('Workout - from 2025-05-01 to 2025-05-07');
  });

  it('should include description if present', () => {
    const result = pipe.transform({
      name: 'Workout',
      description: 'Full body circuit',
    });
    expect(result).toBe(
      'Workout - Description: Full body circuit'
    );
  });

  it('should join all parts in the correct order', () => {
    const result = pipe.transform({
      name: 'Meditation',
      reccurence: 'day',
      reccurenceCoef: 1,
      startingDate: new Date('2025-06-01'),
      endingDate: new Date('2025-06-30'),
      description: 'Morning mindfulness routine',
    });
    expect(result).toBe(
      'Meditation - 1 time(s) per day - from 2025-06-01 to 2025-06-30 - Description: Morning mindfulness routine'
    );
  });
});
