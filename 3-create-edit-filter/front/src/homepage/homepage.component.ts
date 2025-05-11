import { Component, inject } from '@angular/core';
import { HomepageService } from './homepage.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { RoutineService } from '@domain/routine/routine.service';

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
}
