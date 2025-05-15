import { HomepageService } from './homepage.service';
import { Store } from '@ngrx/store';
import { vi } from 'vitest';
import { RoutinePageActions } from '@domain/routine/store/routine.actions';
import { RoutineStatusPageActions } from '@domain/routine-status/store/routine-status.actions';
import { inject } from '@angular/core';
import { selectAllRoutines } from '@domain/routine/store/routine.selectors';
import { selectAllStatuses } from '@domain/routine-status/store/routine-status.selectors';

/**
 * We want to control what inject(Store) returns.
 * We mock it so it returns a fake store (no need for real NgRx here).
 * We reuse await importOriginal() to not break other Angular features.
 */
vi.mock('@angular/core', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    inject: vi.fn(),
  };
});

describe('HomepageService', () => {
  /**
   * dispatch() is used in fetchAll() and toggleOccurrence().
   * selectSignal() is used for the computed properties.
   * We simulate them here with vi.fn() to spy on what’s called.
   */
  const dispatch = vi.fn();
  const selectSignal = vi.fn();

  const storeMock = {
    dispatch,
    selectSignal,
  };

  /**
   * Simulate what the selectors would return in a real app: 2 routines and their statuses.
   * No need for a real backend or store: everything is mocked here.
   */
  const mockRoutines = [
    { id: '1', name: 'Routine A', reccurenceCoef: 3 },
    { id: '2', name: 'Routine B', reccurenceCoef: 2 },
  ];

  const mockStatuses = [
    { routineId: '1', doneOccurrences: [0, 2] },
    { routineId: '2', doneOccurrences: [1] },
  ];

  /**
   * Before each test:
   * - Reset all mocks
   * - Configure selectSignal() to return the proper array depending on the selector
   * - Configure inject() to return our fake store
   */
  beforeEach(() => {
    vi.clearAllMocks();

    selectSignal.mockImplementation((selector: any) => {
      if (selector === selectAllRoutines) return () => mockRoutines;
      if (selector === selectAllStatuses) return () => mockStatuses;
      return () => [];
    });

    (inject as unknown as vi.Mock).mockReturnValue(storeMock);
  });

  /**
   * We create the service
   * We call the .routinesWithOccurrencesArray() method
   * It transforms reccurenceCoef into an array of occurrences → [0, 1, ...]
   * We check that the computation is correct
   */
  it('should return routines with occurrences', () => {
    const service = new HomepageService();
    const result = service.routinesWithOccurrencesArray();

    expect(result).toEqual([
      {
        id: '1',
        name: 'Routine A',
        reccurenceCoef: 3,
        occurences: [0, 1, 2],
      },
      {
        id: '2',
        name: 'Routine B',
        reccurenceCoef: 2,
        occurences: [0, 1],
      },
    ]);
  });

  /**
   * We check that routineStatusesMap() correctly transforms the statuses into a Map.
   * For each routine, we can quickly get the list of completed occurrences.
   */
  it('should return a map of routineStatuses', () => {
    const service = new HomepageService();
    const result = service.routineStatusesMap();

    expect(result.get('1')).toEqual([0, 2]);
    expect(result.get('2')).toEqual([1]);
  });

  /**
   * fetchAll() is a method that dispatches two NgRx actions.
   * We check that dispatch was called with those two actions.
   */
  it('should dispatch fetchAll actions', () => {
    const service = new HomepageService();
    service.fetchAll();

    expect(dispatch).toHaveBeenCalledWith(RoutinePageActions.enter());
    expect(dispatch).toHaveBeenCalledWith(RoutineStatusPageActions.enter());
  });

  /**
   * This method is triggered when a user checks/unchecks a checkbox in the UI.
   * It dispatches an action with routineId, index, and done.
   * We verify that dispatch was called correctly.
   */
  it('should dispatch toggleOccurrence', () => {
    const service = new HomepageService();
    service.toggleOccurrence('1', 0, true);

    expect(dispatch).toHaveBeenCalledWith(
      RoutineStatusPageActions.toggleOccurrence({
        routineId: '1',
        index: 0,
        done: true,
      })
    );
  });
});
