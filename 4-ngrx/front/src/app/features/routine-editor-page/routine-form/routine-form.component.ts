import { Component, computed, DestroyRef, inject, Input, input, OnInit, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormErrorPipe } from '@app/shared/pipes/form-error.pipe';
import { createRoutineForm, RoutineFormGroupValues } from './routine-form.factory';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Component({
  selector: 'app-routine-form',
  imports: [ReactiveFormsModule, FormErrorPipe],
  templateUrl: './routine-form.component.html',
  styleUrl: './routine-form.component.scss',
})
export class RoutineFormComponent implements OnInit {
  private readonly destroyRef$ = inject(DestroyRef);

  @Input({required: true}) actionLabel = '';
  initialValue = input<RoutineFormGroupValues>();
  formSubmit = output<RoutineFormGroupValues>();
  formValueChanges = output<Partial<RoutineFormGroupValues>>();

  readonly routineForm = computed(() => createRoutineForm(this.initialValue()));

  ngOnInit(): void {
      this.routineForm().valueChanges.pipe(
        takeUntilDestroyed(this.destroyRef$),
        tap((value) => {
          this.formValueChanges.emit(value);
        })
      ).subscribe();
  }

  submit() {
    if (this.routineForm().invalid) return;
    this.formSubmit.emit(this.routineForm().getRawValue());
  }
}
