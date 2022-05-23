import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  videos: any[] = [];

  constructor(private youtubeService: YoutubeService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 4000);

    this.youtubeService.url.subscribe(
      (res) => {
        this.youtubeService.searchResult(res).subscribe(
          (result) => {
            this.videos = [];
            console.log(result);
            for (const item of result['items']) {
              this.videos.push(item);
            }
          }
        );
      }
    );
  }

}
