import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-player-qr',
  templateUrl: './player-qr.component.html',
  styleUrls: ['./player-qr.component.scss']
})
export class PlayerQrComponent {

  public qrCodeUrl;
  public loginCode;

  constructor(public dialogRef: MatDialogRef<PlayerQrComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      const loginUrl = `${window.location.protocol}//${window.location.host}/?key=${data.code}`;
      this.loginCode = data.code;
      this.qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(loginUrl)}`
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

}
