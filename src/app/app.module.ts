import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { YtProvider } from '../providers/yt/yt';
import { HttpModule } from "@angular/http";
import { YoutubeVideoPlayer } from "@ionic-native/youtube-video-player";

import { YoutubePlayerModule } from 'ngx-youtube-player';
import { Insomnia } from '@ionic-native/insomnia';

import { VideoPlayer  } from "@ionic-native/video-player";
import { PlayerPage } from '../pages/player/player';
import { WelcomePage } from '../pages/welcome/welcome';
import { TranslateProvider } from '../providers/translate/translate';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PlayerPage,
    WelcomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    YoutubePlayerModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PlayerPage,
    WelcomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    YtProvider,
    YoutubeVideoPlayer,
    VideoPlayer,
    TranslateProvider,
    Insomnia
  ]
})
export class AppModule { }

// platformBrowserDynamic().bootstrapModule(AppModule);
