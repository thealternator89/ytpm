import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChannelDiscovery, ListDiscovery } from 'src/models/discovery';
import { YtpmService } from 'src/app/ytpm.service';

@Component({
  selector: 'app-featured-menu',
  templateUrl: './featured-menu.component.html',
  styleUrls: ['./featured-menu.component.scss']
})
export class FeaturedMenuComponent implements OnInit {

  public lists: ListDiscovery[];

  public channels: ChannelDiscovery[];

  constructor(private ytpmService: YtpmService, private router: Router) { }

  ngOnInit() {
    this.getLists();
    this.getChannels();
  }

  homeButton() {
    this.router.navigateByUrl('/home');
  }

  getLists(): void {
    this.ytpmService.getLists().subscribe(newLists => this.lists = newLists)
  }

  getChannels(): void {
    this.ytpmService.getChannels().subscribe(newChannels => this.channels = newChannels);
  }
}
