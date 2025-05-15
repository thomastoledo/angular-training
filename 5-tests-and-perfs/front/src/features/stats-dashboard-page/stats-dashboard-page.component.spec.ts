import { render, screen } from '@testing-library/angular';
import { StatsDashboardPageComponent } from './stats-dashboard-page.component';
import { StatsDashboardPageService } from './services/stats-dashboard-page.service';
import { vi } from 'vitest';
import { signal } from '@angular/core';

const mockRoutines = [
  {
    id: '1',
    name: 'Morning Routine',
    reccurence: 'day',
    reccurenceCoef: 3,
    doneOccurrences: [0, 2]
  },
  {
    id: '2',
    name: 'Evening Routine',
    reccurence: 'day',
    reccurenceCoef: 2,
    doneOccurrences: [0]
  }
];

describe('StatsDashboardPageComponent', () => {
  it('should display the title and routines', async () => {
    const fetchAllMock = vi.fn();

    const mockService = {
      fetchAll: fetchAllMock,
      routinesWithStatuses: signal(mockRoutines),
    };

    await render(StatsDashboardPageComponent, {
      providers: [{ provide: StatsDashboardPageService, useValue: mockService }],
    });

    expect(screen.getByRole('heading', { name: /routine stats/i })).toBeInTheDocument();

    for (const routine of mockRoutines) {
      expect(screen.getByText(routine.name)).toBeInTheDocument();
      expect(
        screen.getByText(
          new RegExp(`✔\\s*${routine.doneOccurrences.length}\\s*/\\s*${routine.reccurenceCoef}`, 'i')
        )
      ).toBeInTheDocument();
    }

    expect(fetchAllMock).toHaveBeenCalled();
  });
});
