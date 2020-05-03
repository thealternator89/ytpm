import { Component, OnInit } from '@angular/core';
import { YtpmService } from 'src/app/ytpm.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {

  state: {autoPlayEnabled: boolean, queue: any[]};

  constructor(private ytpmService: YtpmService, private router: Router) { }

  ngOnInit() {
    this.ytpmService.getQueue().subscribe((response) => this.state = response);
  }

  homeButton() {
    this.router.navigateByUrl('/home');
  }
}
