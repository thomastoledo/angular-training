import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-prysm-video-player',
  imports: [],
  templateUrl: './prysm-video-player.component.html',
  styleUrl: './prysm-video-player.component.css'
})
export class PrysmVideoPlayerComponent {
  src = input.required<string>();
}
