import { Component } from '@angular/core';
import { YtpmService } from 'src/app/ytpm.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-manual-add',
  templateUrl: './manual-add.component.html',
  styleUrls: ['./manual-add.component.scss']
})
export class ManualAddComponent {

  constructor(private ytpmService: YtpmService, private _snackBar: MatSnackBar) { }

  clickAddToQueue(videoId: string) {
    this.ytpmService.addToQueue({videoId: videoId}).subscribe((data) => {
      this.showVideoAddedSnackbar((data as any).title)
    });
  }

  clickPlayNext(videoId: string) {
    this.ytpmService.addToQueue({videoId: videoId, front: true}).subscribe((data) => {
      this.showVideoAddedSnackbar((data as any).title)
    });
  }

  showVideoAddedSnackbar(title: string) {
    this._snackBar.open(`Added: ${title}`, undefined, { duration: 3000 });
  }

}
