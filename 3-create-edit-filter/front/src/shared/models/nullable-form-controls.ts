import { FormControl } from "@angular/forms";

export type NullableFormControls<T> = {
    [K in keyof T]: FormControl<T[K] | null>
}