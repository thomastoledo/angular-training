import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineFormComponent } from './routine-form.component';

describe('RoutineFormComponent', () => {
  let component: RoutineFormComponent;
  let fixture: ComponentFixture<RoutineFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutineFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
