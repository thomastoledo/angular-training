import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineEditorPageComponent } from './routine-editor-page.component';

describe('RoutineEditorPageComponent', () => {
  let component: RoutineEditorPageComponent;
  let fixture: ComponentFixture<RoutineEditorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutineEditorPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutineEditorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
