import { Routes } from '@angular/router';

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
