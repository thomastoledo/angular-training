import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateRoutineDto } from '@domain/routine/routine.model';
import { NullableFormControls } from 'shared/models/nullable-form-controls';

export type RoutineFormGroupValues = CreateRoutineDto;
export type RoutineFormGroup = FormGroup<
  NullableFormControls<RoutineFormGroupValues>
>;

export function createRoutineForm(): RoutineFormGroup {
  return new FormGroup<NullableFormControls<RoutineFormGroupValues>>({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>(''),
    startingDate: new FormControl<Date | null>(null, [Validators.required]),
    endingDate: new FormControl<Date | null>(null, [Validators.required]),
    reccurence: new FormControl<
      'minute' | 'hour' | 'day' | 'week' | 'month' | 'year'
    >('day', [Validators.required]),
    reccurenceCoef: new FormControl<number | null>(1, [
      Validators.required,
      Validators.min(1),
    ]),
  });
}
