import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { RoutineFormGroupValues } from '../routine-form/routine-form.factory';

@Pipe({
  name: 'routineSummary',
  standalone: true,
  pure: true,
})
export class RoutineSummaryPipe implements PipeTransform {
  transform(formValue: Partial<RoutineFormGroupValues>): string {
    const {
      name,
      description,
      startingDate,
      endingDate,
      reccurence,
      reccurenceCoef,
    } = formValue;

    const parts: string[] = [];

    if (name) {
      parts.push(`${name}`);
    }

    if (reccurence && reccurenceCoef) {
      parts.push(`${reccurenceCoef} time(s) per ${reccurence}`);
    }

    if (startingDate && endingDate) {
      const start =
        startingDate instanceof Date
          ? startingDate.toISOString().slice(0, 10)
          : startingDate;
      const end =
        endingDate instanceof Date
          ? endingDate.toISOString().slice(0, 10)
          : endingDate;
      parts.push(`from ${start} to ${end}`);
    }

    if (description) {
      parts.push(`Description: ${description}`);
    }

    if (parts.length === 0) {
      return 'Waiting for user input…';
    }

    if (parts.length === 1 && name) {
      return `${name} - waiting for other fields to be filled…`;
    }

    return parts.join(' - ');
  }
}
