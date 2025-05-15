// Import des fonctions nécessaires de Testing Library pour Angular
import { render, screen, fireEvent } from '@testing-library/angular';
// Composant à tester
import { RoutineEditorPageComponent } from './routine-editor-page.component';
// Services et dépendances nécessaires
import { RoutineEditorPageService } from './services/routine-editor-page.service';
import { RoutineSummaryPipe } from './pipes/routine-summary.pipe';
import { RoutineFormComponent } from './routine-form/routine-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';
// Type de données pour le modèle de routine
import { RoutineDto } from '@domain/routine/routine.model';

// Données factices de test représentant une routine complète
const mockRoutine: RoutineDto & { occurences: number[] } = {
  id: '123',
  name: 'Morning Routine',
  description: 'A great way to start the day.',
  startingDate: new Date('2025-01-01'),
  endingDate: new Date('2025-01-31'),
  reccurence: 'day',
  reccurenceCoef: 1,
  occurences: [0, 1, 2],
};

// Début de la suite de tests
describe('RoutineEditorPageComponent', () => {
  // Fonction de fabrique pour simuler les méthodes du service
  const createRoutineEditorPageServiceMock = () => ({
    getRoutine: vi.fn().mockReturnValue(of(mockRoutine)),
    createRoutine: vi.fn().mockReturnValue(of(null)),
    patchRoutine: vi.fn().mockReturnValue(of(null)),
  });

  // Mock du routeur Angular
  const routerMock = {
    navigate: vi.fn(),
  };

  // Mock d’ActivatedRoute avec un paramètre d’URL et un mode `edit`
  const activatedRouteMock = {
    paramMap: of(new Map([['id', '123']])),
    snapshot: {
      data: { mode: 'edit' },
    },
  };

  // Test : s'assurer que la routine est chargée si on est en mode édition
  it('should load the routine on init if in edit mode', async () => {
    await render(RoutineEditorPageComponent, {
      componentInputs: {},
      providers: [
        { provide: RoutineEditorPageService, useFactory: createRoutineEditorPageServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        RoutineSummaryPipe,
      ],
      imports: [RoutineFormComponent],
    });

    // Vérifie que le bouton "Update" est visible (preuve que la routine est chargée)
    await screen.findByText('Update');
    expect(screen.getByRole('button', { name: /update/i })).toBeInTheDocument();
  });

  // Test : la méthode updateSummary doit mettre à jour le résumé
  it('should call updateSummary on form value changes', async () => {
    const { fixture } = await render(RoutineEditorPageComponent, {
      providers: [
        { provide: RoutineEditorPageService, useFactory: createRoutineEditorPageServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        RoutineSummaryPipe,
      ],
      imports: [RoutineFormComponent],
    });

    const comp = fixture.componentInstance;
    comp.updateSummary({ name: 'test' });
    expect(comp.summary()).toContain('test');
  });

  // Test : en mode "new", le composant doit appeler createRoutine et naviguer
  it('should navigate to /list after create', async () => {
    const serviceMock = createRoutineEditorPageServiceMock();
    const { fixture } = await render(RoutineEditorPageComponent, {
      providers: [
        { provide: RoutineEditorPageService, useValue: serviceMock },
        { provide: Router, useValue: routerMock },
        {
          provide: ActivatedRoute,
          useValue: { ...activatedRouteMock, snapshot: { data: { mode: 'new' } } },
        },
        RoutineSummaryPipe,
      ],
      imports: [RoutineFormComponent],
    });

    const comp = fixture.componentInstance;
    comp.submit(mockRoutine);

    // Vérifie que createRoutine est bien appelé
    expect(serviceMock.createRoutine).toHaveBeenCalled();
    // Vérifie que la navigation vers la page liste est faite
    expect(routerMock.navigate).toHaveBeenCalledWith(['/list']);
  });

  // Test : en mode édition, patchRoutine doit être appelé avec les bons arguments
  it('should handle patch when editing', async () => {
    const serviceMock = createRoutineEditorPageServiceMock();
    const { fixture } = await render(RoutineEditorPageComponent, {
      providers: [
        { provide: RoutineEditorPageService, useValue: serviceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        RoutineSummaryPipe,
      ],
      imports: [RoutineFormComponent],
    });

    const comp = fixture.componentInstance;
    // Simule que la routine a déjà été chargée
    comp.routine.set(mockRoutine);
    comp.submit(mockRoutine);

    // Vérifie que patchRoutine a été appelé avec l’ID, l’existant et les nouvelles valeurs
    expect(serviceMock.patchRoutine).toHaveBeenCalledWith('123', mockRoutine, mockRoutine);
  });

  // Test : gestion des erreurs lors de la création
  it('should handle errors during submission', async () => {
    // On force le createRoutine à échouer
    const errorServiceMock = {
      ...createRoutineEditorPageServiceMock(),
      createRoutine: vi.fn().mockReturnValue(throwError(() => new Error('fail'))),
    };

    const { fixture } = await render(RoutineEditorPageComponent, {
      providers: [
        { provide: RoutineEditorPageService, useValue: errorServiceMock },
        { provide: Router, useValue: routerMock },
        {
          provide: ActivatedRoute,
          useValue: { ...activatedRouteMock, snapshot: { data: { mode: 'new' } } },
        },
        RoutineSummaryPipe,
      ],
      imports: [RoutineFormComponent],
    });

    const comp = fixture.componentInstance;
    const consoleSpy = vi.spyOn(console, 'error');

    comp.submit(mockRoutine);

    // Vérifie que l’erreur est bien loggée en cas d’échec
    expect(consoleSpy).toHaveBeenCalledWith('Failed to create routine', expect.any(Error));
  });
});
