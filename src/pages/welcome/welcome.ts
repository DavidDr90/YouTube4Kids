import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TranslateProvider } from '../../providers/translate/translate';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  private videoNumber: number;
  private isTime: boolean = false;
  private time:Date;
  minutes;
  hours;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController, private translate: TranslateProvider) {
  }

  start() {
    if (!this.isTime) {
      if ((this.videoNumber <= 0) || (this.videoNumber === undefined)) {
        this.error("Invalid Video Number", "middle");
      } else {
        // set the home page as root page
        this.navCtrl.setRoot(HomePage, { "videoNumber": this.videoNumber });
      }
    } else {
      if ((this.minutes < 0) || (this.minutes > 60))
        this.error("minute must be between 0 to 60!", "button");
      else if ((this.hours < 0) || (this.hours > 12))
        this.error("hours must be above 0 and under 12!", "button");
      else
        if ((this.minutes === undefined) && (this.hours === undefined)) {
          this.error("choose at least one parmeter, minutes or hours", "middle");
        } else {
          this.time = new Date();
          if (this.minutes !== undefined)
            this.time.setMinutes(this.time.getMinutes() + parseInt(this.minutes));
          if (this.hours !== undefined)
            this.time.setHours(this.time.getHours() + parseInt(this.hours));
          console.log(this.time);


          console.log("isTime = " + this.isTime);
          console.log("time: " + this.time);

          this.navCtrl.setRoot(HomePage, {
            "isTime": this.isTime, "time": this.time
          })
        }
    }
  }

  error(meg: string, position: string) {
    let toast = this.toastCtrl.create({
      message: meg,
      duration: 2000,
      position: position
    });
    toast.present();
  }


  /** change the display language to the input on
   *  if the lang is 'he' change all the display to be RTL
   *  else keep the dispaly LTR
   * @param lang language to change to
   */
  setLang(lang: string) {
    lang = lang.toLowerCase();//for the JSON files
    // change the display to RTL
    if (lang !== 'he' && document.getElementsByTagName('html')[0].hasAttribute('dir')) {
      document.getElementsByTagName('html')[0].removeAttribute('dir');
    } else if (lang === 'he' && !document.getElementsByTagName('html')[0].hasAttribute('dir')) {
      document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
    }
    this.translate.use(lang);
  }


}
