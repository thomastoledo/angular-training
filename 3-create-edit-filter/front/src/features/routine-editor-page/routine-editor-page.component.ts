import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutineEditorPageService } from './services/routine-editor-page.service';
import { filter, map, of, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { RoutineDto } from '@domain/routine/routine.model';
import { CommonModule } from '@angular/common';
import { RoutineFormComponent } from "./routine-form/routine-form.component";

@Component({
  selector: 'app-routine-editor-page',
  imports: [CommonModule, RoutineFormComponent],
  templateUrl: './routine-editor-page.component.html',
  styleUrl: './routine-editor-page.component.scss'
})
export class RoutineEditorPageComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly routineEditorPageService = inject(RoutineEditorPageService)

  private readonly id = this.route.snapshot.paramMap.get('id');
  readonly mode: 'create' | 'edit' = this.route.snapshot.data['mode'];

  readonly routine = this.id ? toSignal(this.routineEditorPageService.getRoutine(this.id)) : signal(null);

  submit(routine: any) {
    if (this.mode === 'create') {
      this.routineEditorPageService.createRoutine(routine).subscribe({
        next: () => this.router.navigateByUrl('/')
      });
    } else {
      if (this.id) {
        this.routineEditorPageService.patchRoutine(this.id, routine).subscribe({
        next: () => this.router.navigateByUrl('/')
      });
      }
    }
  }
}
