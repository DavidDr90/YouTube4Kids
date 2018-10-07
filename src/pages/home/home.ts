import { Component } from '@angular/core';
import { NavController, AlertController, Platform, NavParams, Button, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { YtProvider } from '../../providers/yt/yt';

import { PlayerPage } from '../player/player';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  query;

  embedUrl = "https://www.youtube.com/embed/"
  playlists: Observable<any[]>;

  videoNumber;

  constructor(public navCtrl: NavController, private navParams: NavParams, private loadingCtrl: LoadingController,
    private ytProvider: YtProvider, private alertCtrl: AlertController, private plt: Platform) {
    this.videoNumber = this.navParams.get("videoNumber");
    console.log("number = " + this.videoNumber);
  }

  /** search on line for the releate vidoes with the input word
   */
  searchOnYouTube() {
    this.playlists = this.ytProvider.getPlayList(this.query);
    this.playlists.subscribe(data => {
      console.log('playlists: ', data);
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
        "videoNumber": this.videoNumber
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
    this.plt.exitApp();
  }

  presentLoadingText() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: "It's over, Bye Bye!"
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
    console.log("in will enter");
    this.videoNumber = this.navParams.get("videoNumber");
    console.log("video after pop in home page = " + this.videoNumber);
    if ((this.videoNumber <= 0) || (this.videoNumber === undefined)) {
      let alert = this.alertCtrl.create({
        title: "It's over, Bye Bye!",
        buttons: [
          {
            text: 'OK',
            role: 'cancel',
            handler: () => {
              this.exitApp();
            }
          },
        ]
      })
      // alert.present();
      // this.exitApp();
      this.presentLoadingText();
    }
  }

  maxtime: any = 30
  timer;
  maxTime
  hidevalue
  ionViewDidEnter() {
    this.StartTimer();
  }
  StartTimer() {
    this.timer = setTimeout(x => {
      if (this.maxTime <= 0) { }
      this.maxTime -= 1;

      if (this.maxTime > 0) {
        this.hidevalue = false;
        this.StartTimer();
      }

      else {
        this.hidevalue = true;
      }

    }, 1000);
  }
}
