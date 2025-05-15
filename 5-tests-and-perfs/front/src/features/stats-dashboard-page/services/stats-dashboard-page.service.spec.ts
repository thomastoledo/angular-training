import { StatsDashboardPageService } from './stats-dashboard-page.service';
import { RoutineStatusPageActions } from '@domain/routine-status/store/routine-status.actions';
import { RoutinePageActions } from '@domain/routine/store/routine.actions';
import { vi } from 'vitest';
import { inject } from '@angular/core';
import { signal } from '@angular/core';

vi.mock('@angular/core', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    inject: vi.fn(),
    computed: actual.computed,
    signal: actual.signal,
  };
});

describe('StatsDashboardPageService', () => {
  const dispatchMock = vi.fn();
  const selectSignalMock = vi.fn();

  const mockStore = {
    selectSignal: selectSignalMock,
    dispatch: dispatchMock,
  };

  const mockRoutines = [
    { id: '1', name: 'Routine 1', reccurence: 'day', reccurenceCoef: 3 },
    { id: '2', name: 'Routine 2', reccurence: 'week', reccurenceCoef: 2 },
  ];

  const mockStatuses = [
    { routineId: '1', doneOccurrences: [0, 1] },
    { routineId: '2', doneOccurrences: [0] },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (inject as unknown as vi.Mock).mockReturnValue(mockStore);
    selectSignalMock
      .mockImplementationOnce(() => signal(mockRoutines)) // selectAllRoutines
      .mockImplementationOnce(() => signal(mockStatuses)); // selectAllStatuses
  });

  it('should compute routines with statuses', () => {
    const service = new StatsDashboardPageService();

    const result = service.routinesWithStatuses();

    expect(result).toEqual([
      {
        ...mockRoutines[0],
        doneOccurrences: [0, 1],
      },
      {
        ...mockRoutines[1],
        doneOccurrences: [0],
      },
    ]);
  });

  it('should dispatch fetchAll actions', () => {
    const service = new StatsDashboardPageService();

    service.fetchAll();

    expect(dispatchMock).toHaveBeenCalledWith(RoutinePageActions.enter());
    expect(dispatchMock).toHaveBeenCalledWith(RoutineStatusPageActions.enter());
  });
});
