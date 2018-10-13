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
  private isTime: boolean;
  private time;
  minutes;
  hours;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController, private translate: TranslateProvider) {
  }

  start() {
    if (!this.isTime) {
      if ((this.videoNumber <= 0) || (this.videoNumber === undefined)) {
        this.error("Invalid Video Number");
      } else {
        // set the home page as root page
        this.navCtrl.setRoot(HomePage, { "videoNumber": this.videoNumber });
      }
    } else {
      if ( (this.minutes === undefined) && (this.hours === undefined) ) {
        this.error("choose at least one parmeter, minutes or hours");
      } else {
        console.log(this.minutes);
        console.log(this.hours);

        // let temp = new Date();
        // temp.setHours(this.hours);
        // temp.setMinutes(this.minutes);
        // console.log(temp);
        // set the home page as root page
        // this.navCtrl.setRoot(HomePage, { "videoNumber": this.time });
      }
    }
  }

  error(meg:string){
    /*
    let alert = this.alertCtrl.create({
      title: meg,
      buttons: ['OK']
    });
    alert.present();
    */

    let toast = this.toastCtrl.create({
      message: meg,
      duration: 2000,
      position: 'middle'
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
