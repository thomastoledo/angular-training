import { FormControl } from '@angular/forms';

export type NullableFormControls<TYPE> = {
  [KEY in keyof TYPE]: FormControl<TYPE[KEY] | null>;
};
