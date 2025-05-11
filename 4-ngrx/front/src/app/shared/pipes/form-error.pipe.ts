import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Pipe({
  name: 'formError',
  pure: true,
})
export class FormErrorPipe implements PipeTransform {
  transform(errors: {[k: string]: boolean | null | undefined} | null): string | null {
    if (!errors) return null;

    if (errors?.['required']) {
      return 'This field is required.';
    }

    if (errors?.['min']) {
      return `Minimum value is not met.`;
    }

    if (errors?.['email']) {
      return 'Please enter a valid email.';
    }

    return 'Invalid value.';
  }
}
