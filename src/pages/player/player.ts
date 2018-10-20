import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { Insomnia } from '@ionic-native/insomnia';

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
  private isMobile:boolean = true;

  constructor(public navCtrl: NavController, private insomnia: Insomnia,
    public plt: Platform,
    public navParams: NavParams, private alertCtrl: AlertController) {
    this.video = navParams.get("video");
    this.data = navParams.get("data");
    this.videoNumber = navParams.get("videoNumber");
    this.id = this.video.id.videoId;

    this.isMobile = this.plt.is("mobile") ? true : false;
  }

  savePlayer(player) {
    this.player = player;
    this.player.setLoop(false);
    var date = new Date(null);
    date.setSeconds(this.player.getDuration()); // specify value for SECONDS here
    var timeString = date.toISOString().substr(11, 8);
    this.duration = timeString;
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
        if (this.plt.is("mobile"))
          this.insomnia.keepAwake()
            .then(
              () => console.log('keepAwake success'),
              () => console.log('keepAwake error')
            );
        break;
      case STOP:
        console.log("stop");
        if (this.plt.is("mobile"))
          this.insomnia.allowSleepAgain()
            .then(
              () => console.log('allowSleepAgain success'),
              () => console.log('allowSleepAgain error')
            );
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

  /** when temperary leave the app pause the youtube video
   * 
   */
  ionViewDidLeave() {
    this.player.pauseVideo();
    if (this.plt.is("mobile"))
      this.insomnia.allowSleepAgain()
        .then(
          () => console.log('allowSleepAgain success'),
          () => console.log('allowSleepAgain error')
        );
  }

  /** when closing the app stop the video
   * 
   */
  ionViewWillUnload() {
    this.player.stopVideo()
    if (this.plt.is("mobile"))
      this.insomnia.allowSleepAgain()
        .then(
          () => console.log('allowSleepAgain success'),
          () => console.log('allowSleepAgain error')
        );
  }
}
