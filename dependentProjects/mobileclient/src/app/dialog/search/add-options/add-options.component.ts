import { Component, OnInit, Inject } from '@angular/core';
import { YtpmService } from 'src/app/ytpm.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-options',
  templateUrl: './add-options.component.html',
  styleUrls: ['./add-options.component.scss']
})
export class AddOptionsComponent {

  constructor(private ytpmService: YtpmService, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) private data: any) { }

  clickAddToQueue() {
    this.ytpmService.addToQueue({videoId: this.data.videoId}).subscribe((data) => {
      this.showVideoAddedSnackbar((data as any).title)
    });
  }

  clickPlayNext() {
    this.ytpmService.addToQueue({videoId: this.data.videoId, front: true}).subscribe((data) => {
      this.showVideoAddedSnackbar((data as any).title)
    });
  }

  showVideoAddedSnackbar(title: string) {
    this._snackBar.open(`Added: ${title}`, undefined, { duration: 3000 });
  }

}
