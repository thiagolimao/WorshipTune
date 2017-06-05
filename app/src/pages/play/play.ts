import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController,NavParams,Events } from 'ionic-angular';
import { FindPage }  from '../find/find';
import { MenuController } from 'ionic-angular';

declare let cordova: any;

@Component({
  selector: 'page-play',
  templateUrl: 'play.html'
})

export class PlayPage {

	public songs:any;
	public activeSongs:any;
	public playingSong:any;
  public openMenu:any;
	findPage : any;

	constructor(public navCtrl: NavController, public params: NavParams, public menuCtrl: MenuController, public events: Events, public changeD: ChangeDetectorRef) {
		this.songs = params.get("songs");
		this.activeSongs = params.get("activeSongs");
		this.playingSong = {};
		this.findPage = FindPage;
    this.menuCtrl.swipeEnable(false, 'menuPrincipais');
    this.menuCtrl.swipeEnable(false, 'menuInstrumentais');

    this.events.publish('songsLoaded', [this.songs, this.activeSongs]);

    this.events.subscribe('menuOpen', menu => {
      this.openMenu = menu;
      if(menu == 'nomenu'){
        this.menuCtrl.close().then(menu => {this.changeD.detectChanges()});
      }
    });

    this.events.subscribe('playlistUpdate', playlist => {
      this.activeSongs[playlist[0]] = playlist[1];
      var lookup = false;

      if(this.playingSong.playlist == playlist[0]){
        for (var i = 0, len = this.activeSongs[playlist[0]].length; i < len; i++) {
            if(this.activeSongs[playlist[0]][i].id == this.playingSong.id){
              lookup = true;
            }
        }

        if(!lookup){
          this.stopSong();
        }
      }
    });

	}

    playSong(playlist, obj) {
	    this.playingSong = {id: obj.id, playlist: playlist};
      return new Promise((resolve, reject) => {
        cordova.plugins.Music.playSong(
            obj.id,
            function (msg) {
                resolve(true);
            },
            function (e) {
                resolve(true);
            }
        );
      })
    }

    stopSong(){
      this.playingSong = {};
      cordova.plugins.Music.stopSong(
          function (msg) {
              console.log("audio stopped");
          },
          function (e) {
              console.log("Error getting message=" + e);
          }
      );
    }


    toggleSong(playlist, obj){
    	if(this.playingSong.id == obj.id && this.playingSong.playlist == playlist){
    		this.stopSong();
    	} else {
    		this.playSong(playlist, obj).then(playStatus => { this.playingSong = {}; });
    	}
    }

    stopPlayState(){
      this.stopSong();
      this.navCtrl.push(this.findPage);
    }

    isPlayingSong(playlist, obj){
      return (this.playingSong.id == obj.id && this.playingSong.playlist == playlist);
    }

   toggleMenu(menuId) {
     this.menuCtrl.enable(true, menuId).open().then(menu => {this.openMenu = this.openMenu; console.log(menuId); });
     // console.log(this.menuCtrl.isEnabled(menuId));
     // this.menuCtrl.open(menuId).then(menu => { this.openMenu = this.openMenu; console.log('aqui');});
   }

   isMenuOpen(menuId) {
     return this.openMenu == menuId;
   }

}
