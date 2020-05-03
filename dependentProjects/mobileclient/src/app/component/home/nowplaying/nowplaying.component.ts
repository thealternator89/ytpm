import { Component, OnInit, Input } from '@angular/core';
import { Video } from 'src/models/status';
import { YtpmService } from 'src/app/ytpm.service';

@Component({
  selector: 'app-home-nowplaying',
  templateUrl: './nowplaying.component.html',
  styleUrls: ['./nowplaying.component.scss']
})
export class NowplayingComponent {

  @Input() nowPlaying: Video|undefined;
  @Input() status: 'PLAYING'|'PAUSED'|'STOPPED'|'UNKNOWN';

  constructor(private ytpmService: YtpmService) { }

  isValid(): boolean {
    return !!this.nowPlaying.title && !!this.nowPlaying.channelName;
  }

  replayClick() {
    this.ytpmService.sendCommand('REPLAYTRACK');
  }

  playPauseClick() {
    if (this.status === 'PLAYING') {
      this.ytpmService.sendCommand('PAUSE');
    } else {
      this.ytpmService.sendCommand('PLAY');
    }
  }

  skipClick() {
    this.ytpmService.sendCommand('NEXTTRACK');
  }
}
