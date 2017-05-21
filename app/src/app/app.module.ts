import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp }      from './app.component';
//import { HomePage }   from '../pages/home/home';
//import { ListPage }   from '../pages/list/list';

import { FindPage }       from '../pages/find/find';
import { SelectPage }     from '../pages/select/select';
import { PlaylistPage }   from '../pages/playlist/playlist';
import { PlayPage }       from '../pages/play/play';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { Insomnia } from '@ionic-native/insomnia';
import { File } from '@ionic-native/file';
// import { Music } from '@ionic-native/music';


@NgModule({
  declarations: [
    MyApp,
    //HomePage,
    //ListPage,

    FindPage,
    SelectPage,
    PlaylistPage,
    PlayPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    //HomePage,
    //ListPage,

    FindPage,
    SelectPage,
    PlaylistPage,
    PlayPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Insomnia,
    File,
    // Music,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
