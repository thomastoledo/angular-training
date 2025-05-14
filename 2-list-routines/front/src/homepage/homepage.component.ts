import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, Inject, inject, linkedSignal, OnDestroy, OnInit, signal } from '@angular/core';
import { HomepageService } from './homepage.service';
import { RoutineDto } from '@domain/routine/routine.model';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, catchError, EMPTY, take, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-homepage',
  imports: [CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomepageComponent {
  private readonly homepageService = inject(HomepageService);
  private cd = inject(ChangeDetectorRef);
  isLoading = true;
  routines = toSignal(this.homepageService.getRoutines());

  constructor() {
    effect(() => {
      console.log('EFFECT')
      this.isLoading = !this.routines();
      this.cd.detectChanges();
    });
  }
}
