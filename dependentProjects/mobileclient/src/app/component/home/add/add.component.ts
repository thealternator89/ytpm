import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ManualAddComponent } from 'src/app/dialog/home/manual-add/manual-add.component';

@Component({
  selector: 'app-home-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
  }

  clickManual() {
    this.dialog.open(ManualAddComponent, {
      height: '280px',
      width: '300px',
    });
  }

  clickSearch() {
    this.router.navigateByUrl('/search');
  }

  clickFeatured() {
    this.router.navigateByUrl('/featured');
  }

}
