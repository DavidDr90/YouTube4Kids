import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 *  for the youtube player we used the next github project:
 *  https://github.com/orizens/ngx-youtube-player
 */

const INACTIVE = -1, STOP = 0, START = 1, PAUSE = 2, LOADING = 3;

@IonicPage()
@Component({
  selector: 'page-player',
  templateUrl: 'player.html',
})
export class PlayerPage {

  player: YT.Player;
  private id: string;
  private video;
  private data;
  private duration;
  private videoNumber;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    this.video = navParams.get("video");
    this.data = navParams.get("data");
    this.videoNumber = navParams.get("videoNumber");
    if ((this.videoNumber <= 0) || (this.videoNumber === undefined)) {
      let alert = this.alertCtrl.create({
        title: "You Don't have any videos left",
        buttons: ['OK']
      });
      alert.present();
      this.navCtrl.pop();
    }
    console.log("num in player = " + this.videoNumber);
    this.id = this.video.id.videoId;
    // make the duration
    this.duration = new Date(this.ISO8601toMilliseconds(this.data.contentDetails.duration))
    console.log("sec = " + this.duration.getSeconds());
    if (this.duration.getSeconds() >= 10) {
      this.duration = this.duration.getMinutes() + ":" + this.duration.getSeconds();
    } else {
      this.duration = this.duration.getMinutes() + ":0" + this.duration.getSeconds();

    }
    console.log(this.duration);
  }

  savePlayer(player) {
    this.player = player;
  }

  firstTime: Boolean = false;

  onStateChange(event) {
    switch (event.data) {
      case INACTIVE:
        console.log("inactive")
        break;
      case START:
        console.log("start")
        if (!this.firstTime) {
          this.videoNumber--;
          this.firstTime = true
        }
        break;
      case STOP:
        console.log("stop");
        console.log("num of video = " + this.videoNumber);
        this.navCtrl.pop();
        break;
      case PAUSE:
        console.log("pause")
        break;
      case LOADING:
        console.log("running")
        break;
      default:
        console.log("defulat")
        break;
    }
  }

  ionViewWillLeave() {
    this.navCtrl.getPrevious().data.videoNumber = this.videoNumber;
  }

  /** convert an ISO 8601 time format to millisconds
  * @returns the time in millisconds
  * @param iso the duration time in PT#M#S format
  */
  ISO8601toMilliseconds(iso): number {
    let temp = iso.substring(2, iso.length);
    let min, sec;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i] == "M") {
        min = temp.substring(0, i);
        temp = temp.substring(i + 1, iso.length);
      }
      if (temp[i] == "S") {
        console.log(temp);
        console.log(temp[i]);
        sec = temp.substring(0, i);
      }
    }
    sec = (sec === undefined) ? 0 : sec;
    min = (min === undefined) ? 0 : min;

    let milli = ((min * 60000) + ((sec) * 1000));
    console.log("min = " + min);
    console.log("sec = " + sec)
    return milli;
  }

}
