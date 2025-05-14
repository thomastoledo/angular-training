import { Component, computed, effect, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrorPipe } from 'shared/pipes/form-error.pipe';
import { createRoutineForm, RoutineFormGroupValues } from './routine-form.factory';

@Component({
  selector: 'app-routine-form',
  imports: [ReactiveFormsModule, FormErrorPipe],
  templateUrl: './routine-form.component.html',
  styleUrl: './routine-form.component.scss',
})
export class RoutineFormComponent {
  initialValue = input<RoutineFormGroupValues | null>();
  actionLabel = input.required<string>();
  onSubmit = output<any>();

  routineForm = createRoutineForm();

  constructor() {
    effect(() => {
      const initialValue = this.initialValue();
      if (initialValue) {
        const patchedValued = {
          ...initialValue,
          startingDate: new Date(initialValue.startingDate),
          endingDate: new Date(initialValue.endingDate),
        };
        this.routineForm.patchValue(patchedValued)
      }
    });
  }
  submit() {
    this.onSubmit.emit(this.routineForm.getRawValue());
  }
}
