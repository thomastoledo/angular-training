import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrysmVideoPlayerComponent } from './prysm-video-player.component';

describe('PrysmVideoPlayerComponent', () => {
  let component: PrysmVideoPlayerComponent;
  let fixture: ComponentFixture<PrysmVideoPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrysmVideoPlayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrysmVideoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
