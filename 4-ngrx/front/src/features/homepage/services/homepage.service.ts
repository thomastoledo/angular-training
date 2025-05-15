import { computed, inject, Injectable, Signal } from '@angular/core';
import { RoutineStatusPageActions } from '@domain/routine-status/store/routine-status.actions';
import { selectRoutinesStatuses } from '@domain/routine-status/store/routine-status.selectors';
import { RoutineDto } from '@domain/routine/routine.model';
import { RoutinePageActions } from '@domain/routine/store/routine.actions';
import { selectRoutines } from '@domain/routine/store/routine.selectors';
import { Store } from '@ngrx/store';

type RoutineDtoWithListOccurences = RoutineDto & {
  listOccurences: { index: number; checked: boolean }[];
};
// interface RoutineDtoWithListOccurences extends RoutineDto {
//   listOccurences: {index: number; checked: boolean}[]
// };

@Injectable({
  providedIn: 'root',
})
export class HomepageService {
  private readonly store = inject(Store);

  private readonly routines = this.store.selectSignal(selectRoutines);
  private readonly routineStatuses = this.store.selectSignal(selectRoutinesStatuses);

  readonly listRoutines: Signal<RoutineDtoWithListOccurences[]> = computed(() => {
    const routines = this.routines();
    const statuses = this.routineStatuses();
    const routineStatusesMap = new Map<string, number[]>();
    statuses.forEach(({ routineId, doneOccurrences }) => {
      routineStatusesMap.set(routineId, doneOccurrences);
    });

    return routines.map((routine) => {
      return {
        ...routine,
        listOccurences: Array.from(
          { length: routine.reccurenceCoef },
          (_, index) => {
            return {
              index,
              checked: !!routineStatusesMap.get(routine.id)?.includes(index),
            };
          }
        ),
      };
    });
  });

  getRoutines(): void {
    this.store.dispatch(RoutinePageActions.fetchRoutines());
    this.store.dispatch(RoutineStatusPageActions.fetchRoutinesStatus());
  }

  toggleOccurrenceDone(routineId: string, index: number, done: boolean): void {

    this.store.dispatch(RoutineStatusPageActions.toggleOccurenceDone({routineId, index, done}));

    // this.routineStatusService
    //   .toggleOccurrenceDone({ routineId, index, done })
    //   .subscribe({
    //     next: () => {
    //       this._listRoutines.update((routines) => {
    //         const mappedRoutines = routines.map((routine) => {
    //           if (routine.id !== routineId) {
    //             return routine;
    //           } else {
    //             const updatedRoutine: RoutineDtoWithListOccurences = {
    //               ...routine,
    //               listOccurences: routine.listOccurences.map((occurence) => {
    //                 return {
    //                   ...occurence,
    //                   checked:
    //                     occurence.index === index ? done : occurence.checked,
    //                 };
    //               }),
    //             };

    //             return updatedRoutine;
    //           }
    //         });
    //         return mappedRoutines;
    //       });
    //     },
    //   });
  }
}
