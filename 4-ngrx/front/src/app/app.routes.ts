import { provideEffects } from '@ngrx/effects';
import { routineFeatureKey, routineReducer } from './../domains/routine/store/routine.reducer';
import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { RoutineEffects } from '@domain/routine/store/routine.effects';
import { routineStatusFeatureKey, routineStatusReducer } from '@domain/routine-status/store/routine-status.reducer';
import { RoutineStatusEffects } from '@domain/routine-status/store/routine-status.effects';

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
        provideState(routineFeatureKey, routineReducer),
        provideState(routineStatusFeatureKey, routineStatusReducer),
        provideEffects(RoutineEffects, RoutineStatusEffects)
      ]
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
    path: '**',
    redirectTo: 'list',
    pathMatch: 'full',
  },
];
