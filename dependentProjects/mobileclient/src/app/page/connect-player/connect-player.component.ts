import { Component, OnInit } from '@angular/core';
import { YtpmService } from 'src/app/ytpm.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-connect-player',
  templateUrl: './connect-player.component.html',
  styleUrls: ['./connect-player.component.scss']
})
export class ConnectPlayerComponent implements OnInit {

  playerKey: string;

  constructor(private ytpmService: YtpmService, private router: Router, route: ActivatedRoute) { 
    route.queryParams.subscribe(params => {
      let key: string = params["key"] || '';
      this.playerKey = key.substring(0,5);
    });
  }

  ngOnInit() {
    this.ytpmService.checkToken().subscribe((response) => {
      if (response.valid) {
        this.router.navigateByUrl('/home');
      }
    });
  }

  signIn(name: string, key: string) {
    this.ytpmService.auth(name, key).subscribe(() => this.router.navigateByUrl('/'));
  }

}
