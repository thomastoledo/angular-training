import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutineEditorPageService } from './services/routine-editor-page.service';
import { CommonModule } from '@angular/common';
import { RoutineSummaryPipe } from './pipes/routine-summary.pipe';
import { RoutineFormComponent } from './routine-form/routine-form.component';
import { RoutineFormGroupValues } from './routine-form/routine-form.factory';
import { RoutineDto } from '@domain/routine/routine.model';
import { map, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-create-routine-page',
  imports: [CommonModule, RoutineFormComponent],
  providers: [RoutineSummaryPipe],
  templateUrl: './routine-editor-page.component.html',
  styleUrl: './routine-editor-page.component.scss',
})
export class RoutineEditorPageComponent implements OnInit {
  private readonly routineEditorPageService = inject(RoutineEditorPageService);
  private readonly router: Router = inject(Router);
  private readonly routineSummaryPipe = inject(RoutineSummaryPipe);
  private readonly route = inject(ActivatedRoute);
  private readonly id = toSignal(
    this.route.paramMap.pipe(map((paramMap) => paramMap.get('id')))
  );
  readonly mode: 'new' | 'edit' = this.route.snapshot.data['mode'];

  routine = signal<RoutineDto | undefined>(void 0);
  summary = signal('');
  loading = computed(() => {
    return this.id() && !this.routine();
  });

  ngOnInit(): void {
    const id = this.id();
    if (id) {
      this.routineEditorPageService
        .getRoutine(id)
        .pipe(
          tap((routine) => {
            this.routine.set(routine);
          })
        )
        .subscribe();
    }
  }

  updateSummary(values: Partial<RoutineFormGroupValues>): void {
    this.summary.set(this.routineSummaryPipe.transform(values));
  }

  submit(formRawValues: RoutineFormGroupValues) {
    if (this.mode === 'new') {
      this.routineEditorPageService.createRoutine(formRawValues).subscribe({
        next: () => this.router.navigate(['/list']),
        error: (err) => console.error('Failed to create routine', err),
      });
    } else {
      if (this.id() && this.routine()) {
        this.routineEditorPageService
          .patchRoutine(this.id()!, this.routine()!, formRawValues)
          .subscribe({
            next: () => this.router.navigate(['/list']),
            error: (err) => console.error('Failed to create routine', err),
          });
      }
    }
  }
}
