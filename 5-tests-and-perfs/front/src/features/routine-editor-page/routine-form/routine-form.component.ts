import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  Input,
  input,
  OnInit,
  output,
  signal,
  untracked,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormErrorPipe } from '@pipes/form-error.pipe';
import {
  createRoutineForm,
  RoutineFormGroupValues,
} from './routine-form.factory';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Component({
  selector: 'app-routine-form',
  imports: [ReactiveFormsModule, FormErrorPipe],
  templateUrl: './routine-form.component.html',
  styleUrl: './routine-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoutineFormComponent implements OnInit {
  private readonly destroyRef$ = inject(DestroyRef);

  @Input({ required: true }) actionLabel = '';
  initialValue = input<RoutineFormGroupValues>();
  formSubmit = output<RoutineFormGroupValues>();
  formValueChanges = output<Partial<RoutineFormGroupValues>>();

  private readonly _routineForm = signal(createRoutineForm());
  readonly routineForm = this._routineForm();

  constructor() {
    effect(() => {
      const initialValue = this.initialValue();
      if (initialValue) {
        untracked(this._routineForm).patchValue(initialValue)
      }
    });
  }

  ngOnInit(): void {
    this._routineForm()
      .valueChanges.pipe(
        takeUntilDestroyed(this.destroyRef$),
        tap((value) => {
          this.formValueChanges.emit(value);
        })
      )
      .subscribe();
  }

  submit() {
    const form = this._routineForm();
    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }
    this.formSubmit.emit(form.getRawValue());
  }
}
