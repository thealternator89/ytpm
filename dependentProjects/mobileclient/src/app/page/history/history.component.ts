import { Component, OnInit } from '@angular/core';
import { YtpmService } from 'src/app/ytpm.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  historyItems: any;

  constructor(private ytpmService: YtpmService, private router: Router) { }

  ngOnInit() {
    this.ytpmService.getHistory().subscribe((response) => this.historyItems = response);
  }

  homeButton() {
    this.router.navigateByUrl('/home');
  }

}
