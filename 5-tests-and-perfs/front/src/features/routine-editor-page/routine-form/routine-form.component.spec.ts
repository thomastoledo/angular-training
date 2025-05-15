import { render, fireEvent, screen } from '@testing-library/angular';
import { RoutineFormComponent } from './routine-form.component';
import { RoutineFormGroupValues } from './routine-form.factory';
import { provideAnimations } from '@angular/platform-browser/animations';
import { vi } from 'vitest';

describe('RoutineFormComponent', () => {
  const initialValue: RoutineFormGroupValues = {
    name: 'Test Routine',
    description: 'A description',
    startingDate: new Date('2025-01-01'),
    endingDate: new Date('2025-01-31'),
    reccurence: 'day',
    reccurenceCoef: 3,
  };

  it('should render with initial values', async () => {
    await render(RoutineFormComponent, {
      componentInputs: {
        actionLabel: 'Create',
        initialValue,
      },
      providers: [provideAnimations()],
    });

    expect(screen.getByDisplayValue('Test Routine')).toBeInTheDocument();
    expect(screen.getByDisplayValue('A description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument();
  });

  it('should not emit if required field is missing', async () => {
    const formSubmit = vi.fn();

    const invalidValue: RoutineFormGroupValues = {
      ...initialValue,
      name: null,
    };

    await render(RoutineFormComponent, {
      componentInputs: {
        actionLabel: 'Create',
        initialValue: invalidValue,
      },
      componentOutputs: {
        formSubmit,
      },
      providers: [provideAnimations()],
    });

    fireEvent.click(screen.getByRole('button', { name: /create/i }));
    expect(formSubmit).not.toHaveBeenCalled();
  });

});
