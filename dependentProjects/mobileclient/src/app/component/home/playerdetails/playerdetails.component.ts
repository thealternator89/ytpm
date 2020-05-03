import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlayerQrComponent } from 'src/app/dialog/home/player-qr/player-qr.component';
import { YtpmService } from 'src/app/ytpm.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-playerdetails',
  templateUrl: './playerdetails.component.html',
  styleUrls: ['./playerdetails.component.scss']
})
export class PlayerdetailsComponent {

  @Input() playerCode: string;

  constructor(public dialog: MatDialog, private ytpmService: YtpmService, private router: Router) { }

  showLoginQrCode() {
    this.dialog.open(PlayerQrComponent, {
      height: '300px',
      width: '250px',
      data: {
        code: this.playerCode
      }
    });
  }

  logOut() {
    this.ytpmService.deauth();
    this.router.navigateByUrl('/login');
  }

}
