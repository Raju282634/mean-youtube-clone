import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private urlSource = new BehaviorSubject('');
  url = this.urlSource.asObservable();
  apiKey = 'AIzaSyCmr8J8cLB_lrbAsCRZaoazjvcSw077K98';

  constructor(private http: HttpClient) { }

  getVideos(max: any): Observable<object> {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&key=${this.apiKey}&maxResults=${max}&regionCode=IN`;
    return this.http.get(url).pipe(map(res => {
      return res;
    }));
  }

  searchVideo(value: any) {
    this.urlSource.next(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${value}&key=${this.apiKey}&maxResults=15`);
  }

  searchResult(url: any): Observable<object> {
    return this.http.get(url).pipe(map(res => {
      return res;
    }));
  }

  getAutocomplete(query: any): Observable<object> {
    const url = `http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${query}`;
    return this.http.get(url).pipe(map(res => {
      return res;
    }));
  }

  getVideo(query: any): Observable<object> {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${query}&key=${this.apiKey}`;
    return this.http.get(url).pipe(map(res => {
      return res;
    }));
  }

  getComments(id: any): Observable<object> {
    const url = `https://www.googleapis.com/youtube/v3/commentThreads?key=${this.apiKey}&textFormat=plainText&part=snippet&videoId=${id}&maxResults=20`;
    return this.http.get(url).pipe(map(res => {
      return res;
    }));
  }

  getChannel(id: any): Observable<object> {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${id}&key=${this.apiKey}`;
    return this.http.get(url).pipe(map(res => {
      return res;
    }));
  }

}
