import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { YoutubeService } from 'src/app/services/youtube.service';

@Component({
  selector: 'app-watch-video',
  templateUrl: './watch-video.component.html',
  styleUrls: ['./watch-video.component.css']
})
export class WatchVideoComponent implements OnInit {

  id: any = '';
  channelId: any = '';
  video: any = [];
  videos: any[] = [];
  comments: any[] = [];
  channel: any = [];
  toggle = false;

  constructor(private youtubeService: YoutubeService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParamMap.get('id');
    this.channelId = this.route.snapshot.queryParamMap.get('channelId');
    this.getVideo(this.id);
    this.getVideos();
    this.getChannel(this.channelId);
    this.getComments(this.id);
  }

  getVideo(id: any) {
    this.youtubeService.getVideo(id).subscribe(
      (res) => {
        this.video = res['items'][0];
        console.log(this.video);
      }
    );
  }

  getVideos() {
    this.youtubeService.getVideos(10).subscribe(
      (res) => {
        for (const list of res['items']){
          this.videos.push(list);
        }
      }
    );
  }

  getChannel(id: any) {
    this.youtubeService.getChannel(id).subscribe(
      (res) => {
        this.channel = res['items'][0];
      }
    );
  }

  getComments(id: any) {
    this.youtubeService.getComments(id).subscribe(res => {
      for (const list of res['items']) {
        this.comments.push(list);
      }
    });
    console.log(this.comments);
  }

  toggleShow(){
    this.toggle = !this.toggle;
  }

  convertMonth(date: any){
    return moment().fromNow();
  }

  convertDate(date: any){
    return moment(date).format('11');
  }

  convertCount(x: any){
    x = x.toString();
    let lastThree = x.substring(x.length - 3);
    const otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers !== '') {
      lastThree = ',' + lastThree;
    }
    const res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
    return res;
  }

  convertLikes(count: any){
  if (parseInt(count) >= 1000000) {
    const str = (parseInt(count) / 1000000).toPrecision(2).toString();
    return `${str}M`;
  }
  else if (parseInt(count) >= 1000) {
    const str = (parseInt(count) / 1000).toFixed(0).toString();
    return `${str}K`;
  }
  else if (parseInt(count) < 1000) {
    return count;
  }
  }

}
