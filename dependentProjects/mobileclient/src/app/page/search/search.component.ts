import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { YtpmService } from 'src/app/ytpm.service';
import { MatDialog } from '@angular/material/dialog';
import { AddOptionsComponent } from 'src/app/dialog/search/add-options/add-options.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{

  autoComplete: string[] = [];

  searchResults: any[] = [];

  nextPage: string;

  @ViewChild('searchBox', {static: true}) searchField; 

  constructor(private ytpmService: YtpmService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.searchField.nativeElement.focus();
    this.onSearchChange('');
  }

  homeButton() {
    this.router.navigateByUrl('/home');
  }

  onSearchChange(autoCompleteTerm: string) {
    this.searchResults = [];
    this.ytpmService.getAutoComplete(autoCompleteTerm).subscribe((results) => this.autoComplete = results);
  }

  onFormSubmit(searchTerm: string, event: Event) {
    event.preventDefault();
    this.search(searchTerm);
  }

  search(searchTerm: string) {
    this.searchField.nativeElement.value = searchTerm;
    this.ytpmService.getSearchResults(searchTerm).subscribe((result) => {
      this.nextPage = result.nextPageToken;
      this.searchResults = result.results;
    });
  }

  add(videoId: string) {
    this.dialog.open(AddOptionsComponent, {
      height: '170px',
      width: '300px',
      data: {
        videoId: videoId,
      }
    });
  }

}
