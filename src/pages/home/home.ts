import { Component } from '@angular/core';
import { NavController, AlertController, Platform, NavParams, Button, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { YtProvider } from '../../providers/yt/yt';

import { PlayerPage } from '../player/player';
import { min } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  query;

  embedUrl = "https://www.youtube.com/embed/"
  playlists: Observable<any[]>;

  videoNumber;
  found: boolean = true;
  isTime: any;
  time: any;
  lastMinute: boolean = false;
  private isMobile: boolean = true;


  constructor(public navCtrl: NavController, private navParams: NavParams, private loadingCtrl: LoadingController,
    private ytProvider: YtProvider, private alertCtrl: AlertController, private plt: Platform) {
    this.isMobile = this.plt.is("mobile") ? true : false;
  }

  /** search on line for the releate vidoes with the input word
   */
  searchOnYouTube() {
    this.playlists = this.ytProvider.getPlayList(this.query);
    let loading = this.loadingCtrl.create({
      // content: "working on it, please wait..."
      content: "אנחנו מחפשים, אנא המתן..."
    });
    loading.present();

    this.playlists.subscribe(data => {
      loading.dismiss();
      if (data.length === 0) {
        this.found = false;
      }
      else {
        this.found = true;
        console.log('playlists: ', data);
      }
    }, err => {
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: err,
        buttons: ['OK']
      });
      alert.present();
    })
  }

  /**play the choosen video
   * if the app run over mobile
   * if over web open a new window and play the tube
   */
  playYouTubeVideo(video) {
    let playlists = this.ytProvider.getDuration(video.id.videoId);
    playlists.subscribe((data) => {
      console.log(data);
      this.navCtrl.push(PlayerPage, {
        "video": video,
        "data": data[0],
        "videoNumber": this.videoNumber,
        "time":this.time,
        "isTime":this.isTime
      });
    }, err => {
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: err,
        buttons: ['OK']
      });
      alert.present();
    })
  }

  /** close the app
   */
  exitApp() {
    console.log("bye bye");
    if (this.plt.is("mobile")) {//if this a mobile app close the app
      console.log("I'm mobile app");
      this.plt.exitApp();
    } else {//if this is a web page close the current tab
      console.log("I'm browser app");
      window.close();
    }
  }

  presentLoadingText() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      // content: "It's over, Bye Bye!"
      content: "זה נגמר, בי בי!"
    });

    loading.present();

    setTimeout(() => {
      this.exitApp();
    }, 2000);

    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }

  ionViewWillEnter() {
    this.isTime = this.navParams.get("isTime");
    if (this.isTime) {
      this.time = this.navParams.get("time");
      this.countdwon(this.time);
    } else {
      this.videoNumber = this.navParams.get("videoNumber");
      if ((this.videoNumber <= 0) || (this.videoNumber === undefined)) {
        this.presentLoadingText();
      }
    }
  }


  countdwon(time: Date) {
    // Set the date we're counting down to
    var countDownDate = this.time.getTime();
    var temp = this;//for using inside the setInterval function
    // Update the count down every 1 second
    var x = setInterval(function () {

      // Get todays date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      //fix the display when 0 is left
      var str = "";
      if (hours < 10)
        str += "0" + hours + ":";
      else
        str += hours + ":"
      if (minutes < 10)
        str += "0" + minutes + ":";
      else
        str += minutes + ":"
      if (seconds < 10)
        str += "0" + seconds
      else
        str += seconds
      // Display the result in the element with id="countdwonTimer"
      document.getElementById("countdwonTimer").innerHTML = str;

      // If the count down is finished, write some text 
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdwonTimer").innerHTML = "It's Over! Bye Bye!";
        setTimeout(() => {
          temp.exitApp();
        }, 2000);
      }

      if (distance < 60000) {
        temp.lastMinute = true;
      }
    }, 1000);
  }

}
