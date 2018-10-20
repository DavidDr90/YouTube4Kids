import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TranslateProvider } from '../../providers/translate/translate';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  private videoNumber: number;
  private time;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController, private translate: TranslateProvider) {
  }

  start() {
    if ((this.videoNumber <= 0) || (this.videoNumber === undefined)) {
      let alert = this.alertCtrl.create({
        title: 'Invalid Video Number',
        buttons: ['OK']
      });
      alert.present();
    } else {
      // set the home page as root page
      this.navCtrl.setRoot(HomePage, { "videoNumber": this.videoNumber });
    }
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
