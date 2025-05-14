import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formError'
})
export class FormErrorPipe implements PipeTransform {

  transform(errors: {[k: string]: boolean | null | undefined} | null): unknown {
    if (!errors) return null;

    if (errors['required']) {
      return `This field is required`;
    }

    if (errors['min']) {
      return `Minimum value is not met`;
    }
    return null;
  }

}
