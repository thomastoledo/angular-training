import { Routes } from '@angular/router';
import { RoutineStatusEffects } from '@domain/routine-status/store/routine-status.effects';
import { routineStatusReducer } from '@domain/routine-status/store/routine-status.reducer';
import { RoutineEffects } from '@domain/routine/store/routine.effects';
import { routineReducer } from '@domain/routine/store/routine.reducer';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
  {
    path: 'list',
    loadComponent: () =>
      import('../features/homepage/homepage.component').then(
        (m) => m.HomepageComponent
      ),
    providers: [
      provideState('routine', routineReducer),
      provideState('routineStatus', routineStatusReducer),
      provideEffects([RoutineEffects, RoutineStatusEffects]),
    ],
  },
  {
    path: 'new',
    loadComponent: () =>
      import(
        '../features/routine-editor-page/routine-editor-page.component'
      ).then((m) => m.RoutineEditorPageComponent),
    data: {
      mode: 'new',
    },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import(
        '../features/routine-editor-page/routine-editor-page.component'
      ).then((m) => m.RoutineEditorPageComponent),
    data: {
      mode: 'edit',
    },
  },
  {
    path: 'stats',
    loadComponent: () =>
      import(
        '../features/stats-dashboard-page/stats-dashboard-page.component'
      ).then((m) => m.StatsDashboardPageComponent),
    providers: [
      provideState('routine', routineReducer),
      provideState('routineStatus', routineStatusReducer),
      provideEffects([RoutineEffects, RoutineStatusEffects]),
    ],
  },
  {
    path: '**',
    redirectTo: 'list',
    pathMatch: 'full',
  },
];
