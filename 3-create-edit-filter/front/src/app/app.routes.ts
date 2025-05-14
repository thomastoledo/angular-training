import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
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
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import(
        '../features/routine-editor-page/routine-editor-page.component'
      ).then((m) => m.RoutineEditorPageComponent),
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
