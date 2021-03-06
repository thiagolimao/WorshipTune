import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { HomePage } from '../pages/home/home';
//import { ListPage } from '../pages/list/list';

import { FindPage }  from '../pages/find/find';
import { SelectPage }  from '../pages/select/select';
import { PlaylistPage }  from '../pages/playlist/playlist';
import { PlayPage }  from '../pages/play/play';
declare var cordova: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  public songsApp:any;
  public activeSongsApp:any;

  //rootPage: any = FindPage;
  //rootPage: any = SelectPage;
  //rootPage: any = PlaylistPage;
  rootPage: any = FindPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public events: Events) {
    this.initializeApp();
    this.songsApp = [];
    this.activeSongsApp = [];

    // used for an example of ngFor and navigation
    this.pages = [
      //{ title: 'Home', component: HomePage },
      //{ title: 'List', component: ListPage },

      { title: 'Find', component: FindPage },
      { title: 'Select', component: SelectPage },
      { title: 'Playlist', component: PlaylistPage },
      { title: 'Play', component: PlayPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      cordova.plugins.Music.getSongs(
          function (list) {
              console.log('music initialized!!')
          },
          function (e) {
              console.log('music fail!!')
          }
      );

    this.events.subscribe('songsLoaded', songs => {
      this.songsApp = songs[0];
      this.activeSongsApp = songs[1];
    });

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  menuClosed() {
      this.events.publish('menuOpen', 'nomenu');
  }

   menuOpened(menu) {
      this.events.publish('menuOpen', menu);
  }

  activeArrayApp(playlist, obj) {
    return this.activeSongsApp[playlist].indexOf(obj) > -1;
  }

  updatePlaylist(playlist, obj) {

    var index = this.activeSongsApp[playlist].indexOf(obj);
    if(index > -1)
      this.activeSongsApp[playlist].splice(index, 1);
    else
      this.activeSongsApp[playlist].push(obj);

    this.events.publish('playlistUpdate', [playlist, this.activeSongsApp[playlist]]);
  }

}
