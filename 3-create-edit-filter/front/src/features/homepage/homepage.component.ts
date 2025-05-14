import {
  Component,
  computed,
  EventEmitter,
  inject,
  input,
  Input,
  model,
  output,
  Output,
  signal,
  untracked,
} from '@angular/core';
import { HomepageService } from './homepage.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { RoutineService } from '@domain/routine/routine.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  imports: [CommonModule, FormsModule],
  providers: [RoutineService],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {
  private readonly homepageService = inject(HomepageService);
  private readonly router = inject(Router);
  readonly routines = toSignal(this.homepageService.getRoutines(), {
    initialValue: [],
  });

  filteredList = computed(() => {
    return this.routines().filter(({ name }) =>
      name.toLowerCase().includes(this.searchTerm().toLowerCase())
    );
  });
  searchTerm = model('');

  goToCreation() {
    this.router.navigateByUrl('/new', {state: {mode: 'new'}});
  }

  goToEdit(routineId: string) {
    this.router.navigateByUrl(`/edit/${routineId}`, {state: {mode: 'edit'}});
  }
  /**
   * TODO - implement the following:
   * when clicking on a routine, it must expand and show its details alongside an "edit" button
   */
}
