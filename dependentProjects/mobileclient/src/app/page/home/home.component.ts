import { Component, OnInit, OnDestroy } from '@angular/core';
import { QueueStatus } from 'src/models/status';
import { YtpmService } from 'src/app/ytpm.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  // Dummy data, just so it's initially valid before the http request comes back.
  status: QueueStatus = {
    playingNow: {} as any,
    upNext: {} as any,
    playerStatus: 'UNKNOWN',
    lastUpdated: 0,
    playerCode: '',
    queueLength: NaN,
  };

  statusSub: Subscription = new Subscription();

  constructor(private ytpmService: YtpmService) { }

  ngOnInit() {
    this.getStatus();
  }

  ngOnDestroy(): void {
    this.statusSub.unsubscribe();
  }

  getStatus(lastUpdated: number = 0): void {
    this.statusSub.unsubscribe();

    this.statusSub = new Subscription();
    this.statusSub.add(
      this.ytpmService.getStatus(lastUpdated).subscribe(status => {
        let since = lastUpdated;
        if(status) {
          this.status = {
            playingNow: {},
            upNext: {},
            playerStatus: "UNKNOWN",
            ...status
          };
          since = status.lastUpdated;
        }
        this.getStatus(since);
      })
    );
  }
}
