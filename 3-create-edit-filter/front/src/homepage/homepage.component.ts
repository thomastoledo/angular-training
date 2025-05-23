import { Component, inject } from '@angular/core';
import { HomepageService } from './homepage.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { RoutineService } from '@domain/routine/routine.service';

// TODO: move the whole component (ts, template, test, scss...) under a "src/features" folder
@Component({
  selector: 'app-homepage',
  imports: [CommonModule],
  providers: [RoutineService],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  private readonly homepageService = inject(HomepageService);
  readonly routines = toSignal(this.homepageService.getRoutines(), { initialValue: [] });

  /**
   * TODO - implement the following:
   * a search bar to filter the list (use computed and model)
   * in the template, put a "new" button beside the search bar
   * when clicking on the "new" button, redirect to a page with a creation form
   * when clicking on a routine, it must expand and show its details alongside an "edit" button
   * when clicking on the "edit" button, we should be redirected to a page with a pre-filled form (the same as creation form)
   */
}
