import { render, screen, fireEvent } from '@testing-library/angular';
import { HomepageComponent } from './homepage.component';
import { HomepageService } from './services/homepage.service';
import { Router } from '@angular/router';
import { signal } from '@angular/core';
import { vi } from 'vitest';

/**
 * routinesWithOccurrencesArray returns the list of routines to display
 * routineStatusesMap is a map used in the template
 */
const mockRoutines = signal([
  {
    id: '1',
    name: 'Morning Routine',
    description: 'Start your day right',
    startingDate: '2025-01-01',
    endingDate: '2025-12-31',
    reccurence: 'day',
    reccurenceCoef: 3,
    occurences: [0, 1, 2],
  },
]);

const mockRoutineStatuses = signal(new Map([['1', [0]]]));

/**
 * The service is injected into the component
 * We mock it here to have a unit test (without depending on the real service)
 * We also mock the Router to verify navigate() calls in the tests
 */
const mockHomepageService = {
  routinesWithOccurrencesArray: mockRoutines,
  routineStatusesMap: mockRoutineStatuses,
  fetchAll: vi.fn(),
  toggleOccurrence: vi.fn(),
};

const mockRouter = {
  navigate: vi.fn(),
};

describe('HomepageComponent', () => {
  it('should render search input and button', async () => {
    /**
     * We use render() to mount the component
     * We inject the mocks
     * We verify that the key elements from the template are present
     */
    await render(HomepageComponent, {
      providers: [
        { provide: HomepageService, useValue: mockHomepageService },
        { provide: Router, useValue: mockRouter },
      ],
    });

    expect(screen.getByPlaceholderText('Search routines...')).toBeInTheDocument();
    expect(screen.getByText('+ Create Routine')).toBeInTheDocument();
  });

  it('should display a routine', async () => {
    /**
     * The component uses the routinesWithOccurrencesArray signal
     * This test checks that the routine provided by the mock is correctly displayed
     */
    await render(HomepageComponent, {
      providers: [
        { provide: HomepageService, useValue: mockHomepageService },
        { provide: Router, useValue: mockRouter },
      ],
    });

    expect(screen.getByText('Morning Routine')).toBeInTheDocument();
  });

  it('should expand details on click', async () => {
    await render(HomepageComponent, {
      providers: [
        { provide: HomepageService, useValue: mockHomepageService },
        { provide: Router, useValue: mockRouter },
      ],
    });

    /**
     * We simulate a click on the routine
     * We check that the details are properly displayed
     * We use findByText because it's asynchronous (the DOM updates with a delay)
     */
    fireEvent.click(screen.getByText('Morning Routine'));

    expect(await screen.findByText(/Start:/)).toBeInTheDocument();
    expect(await screen.findByText(/Recurrence:/)).toBeInTheDocument();
  });

  it('should call router.navigate on edit', async () => {
    await render(HomepageComponent, {
      providers: [
        { provide: HomepageService, useValue: mockHomepageService },
        { provide: Router, useValue: mockRouter },
      ],
    });

    /**
     * The user clicks on "Edit"
     * The component calls router.navigate(...)
     * We verify that the routing is correct with the right parameters
     */
    fireEvent.click(screen.getByText('Edit'));

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/edit', '1'], {
      state: { mode: 'edit' },
    });
  });
});
