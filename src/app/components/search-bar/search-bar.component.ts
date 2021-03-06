import {Component, OnInit} from '@angular/core';
import {InstagramDownloaderService} from '../../services/instagram-downloader.service';

enum SearchMode {
  PHOTO,
  PROFILE,
}

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  searchModes = SearchMode;

  searchMode: SearchMode = SearchMode.PHOTO; // default mode
  isLoading: boolean;

  constructor(private instagramDownloaderService: InstagramDownloaderService) {
  }

  ngOnInit() {
    this.instagramDownloaderService.loadingStatus$.subscribe(value => this.isLoading = value);
  }

  search(query: string) {
    switch (this.searchMode) {
      case SearchMode.PHOTO:
        const re = /.*\/p\/(.*?)\/.*/g;
        const match = re.exec(query);
        console.log(match[1]); // abc
        this.instagramDownloaderService.getPhoto(match[1]);
        break;
      case SearchMode.PROFILE:
        this.instagramDownloaderService.getProfile(query);
        break;
    }
  }

  switchSearchMode(value: SearchMode) {
    this.searchMode = value;
  }
}
