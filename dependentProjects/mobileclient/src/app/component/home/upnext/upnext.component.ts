import { Component, Input } from '@angular/core';
import { UpNextVideo } from 'src/models/status';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-upnext',
  templateUrl: './upnext.component.html',
  styleUrls: ['./upnext.component.scss']
})
export class UpnextComponent {

  @Input() upNext: UpNextVideo|undefined;
  @Input() queueLength: number|undefined;

  constructor(private router: Router) { }

  clickQueue() {
    this.router.navigateByUrl('/queue');
  }

  clickHistory() {
    this.router.navigateByUrl('/history');
  }

  queueLengthBadgeContent(): string {
    if (this.queueLength < 100) {
      return `${this.queueLength}`;
    } else if (this.queueLength > 100) {
      return '😁';
    } else {
      return '😖';
    }
  }

  queueLengthBadgeColor(): string {
    if (this.queueLength >= 10) {
      return 'primary';
    } else if (this.queueLength > 1) {
      return 'accent';
    } else {
      return 'warn';
    }
  }

  isValid(): boolean {
    return !!this.upNext.title && !!this.upNext.channelName;
  }

}
