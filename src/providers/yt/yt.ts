import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';




@Injectable()
export class YtProvider {

  constructor(public http: Http) {

  }


  apiKey = "key=AIzaSyAS9M1PAYTOy1Tx1wg1yoddvc2iftUwkkU"
  maxResults = 20;
  youtubeSearchURI = "https://www.googleapis.com/youtube/v3/search?"
  type = "video"//if empty will get video channels and playlists
  getPlayList(query) {
    return this.http.get(this.youtubeSearchURI + this.apiKey
      + '&q=' + query +
      '&part=snippet,id&maxResults=' + this.maxResults
      + "&type=" + this.type)
      .map((res) => {
        return res.json()['items'];
      })
  }


  durationURL = "https://www.googleapis.com/youtube/v3/videos?"
  getDuration(id) {
    return this.http.get(this.durationURL + this.apiKey
      + "&part=contentDetails&id=" + id)
      .map((res) => {
        return res.json()['items'];
      })

  }
}
