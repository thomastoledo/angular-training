import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreateRoutineDto } from '@app/routine/routine.model';
import { NullableFormControls } from '@app/shared/models/nullable-form-control';
import { NullableValue } from '@app/shared/models/nullable-value';

export type RoutineFormGroupValues = NullableValue<CreateRoutineDto>;
export type RoutineFormGroup = FormGroup<NullableFormControls<RoutineFormGroupValues>>;

export function createRoutineForm(initial?: Partial<RoutineFormGroupValues>): RoutineFormGroup {
  return new FormGroup<NullableFormControls<CreateRoutineDto>>({
    name: new FormControl(initial?.name ?? null, Validators.required),
    description: new FormControl(initial?.description ?? null),
    startingDate: new FormControl(initial?.startingDate ?? null, Validators.required),
    endingDate: new FormControl(initial?.endingDate ?? null, Validators.required),
    reccurence: new FormControl(initial?.reccurence ?? 'day', Validators.required),
    reccurenceCoef: new FormControl(initial?.reccurenceCoef ?? 1, [
      Validators.required,
      Validators.min(1),
    ]),
  });
}