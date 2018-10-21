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
  private isMobile: boolean = true;
  private isTime: boolean = false;
  private lastMinute: boolean = false;
  private time: Date;

  constructor(public navCtrl: NavController, private insomnia: Insomnia,
    public plt: Platform,
    public navParams: NavParams, private alertCtrl: AlertController) {
    this.video = navParams.get("video");
    this.data = navParams.get("data");
    this.isTime = this.navParams.get("isTime");
    if (this.isTime) {
      this.time = this.navParams.get("time");
      this.countdwon(this.time);
    } else {
      this.videoNumber = this.navParams.get("videoNumber");
    }
    
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
        sec = temp.substring(0, i);
      }
    }
    sec = (sec === undefined) ? 0 : sec;
    min = (min === undefined) ? 0 : min;

    let milli = ((min * 60000) + ((sec) * 1000));
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

  ionViewWillEnter() {

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
        temp.navCtrl.popToRoot();
      }

      if (distance < 60000) {
        temp.lastMinute = true;
      }
    }, 1000);
  }
}
