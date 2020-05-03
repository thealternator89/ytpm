import { Component, OnInit } from '@angular/core';
import { YtpmService } from 'src/app/ytpm.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-authcheck',
  templateUrl: './authcheck.component.html',
  styleUrls: ['./authcheck.component.scss']
})
export class AuthcheckComponent implements OnInit {

  playerKey: string;

  constructor(private ytpmService: YtpmService, private router: Router, route: ActivatedRoute) {
    route.queryParams.subscribe(params => {
      this.playerKey = params["key"];
    });
  }

  ngOnInit() {
    this.ytpmService.checkToken().subscribe((response) => {
      if (!response.valid) {
        let keyParam = this.playerKey ? `?key=${this.playerKey}` : '';
        this.router.navigateByUrl(`/connect${keyParam}`);
      } else {
        this.router.navigateByUrl('/home');
      }
    });
  }

}
