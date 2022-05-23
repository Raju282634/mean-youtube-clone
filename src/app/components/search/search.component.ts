import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { YoutubeService } from './../../services/youtube.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchInput: any = '';
  autoList: any[] = [];

  constructor(private youtubeService: YoutubeService,
              private router: Router) { }

  ngOnInit(): void {
  }

  getAutocomplete(input: any){
    this.youtubeService.getAutocomplete(input).subscribe(
      (res) => {
        this.autoList = res[1];
        const list = document.getElementById('autoList');
        if (this.autoList.length === 0) {
          return;
        }
        list.innerHTML = '';
        for (let i = 0; i < this.autoList.length; i++) {
          const option = document.createElement('option');
          option.value = this.autoList[i];
          list.appendChild(option);
        }
      }
    );
  }

  getValue(input: any){
    this.youtubeService.searchVideo(input);
    this.searchInput = '';
    this.router.navigate(['/search']);
  }
}
