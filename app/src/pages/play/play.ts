import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController,NavParams,Events } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SelectPage }  from '../select/select';

declare let cordova: any;

@Component({
  selector: 'page-play',
  templateUrl: 'play.html'
})

export class PlayPage {

	public songs:any;
	public activeSongs:any;
	public playingSong:any;
  public pausedSong:any;
  public openMenu:any;
	selectPage : any;

	constructor(public navCtrl: NavController, public params: NavParams, public menuCtrl: MenuController, public events: Events, public changeD: ChangeDetectorRef, public alertCtrl: AlertController) {
		this.songs = params.get("songs");
		this.activeSongs = params.get("activeSongs");
		this.playingSong = params.get("playingSong");
    this.pausedSong = {};
		this.selectPage = SelectPage;
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
    if(JSON.stringify(this.pausedSong) === JSON.stringify(this.playingSong)){
      this.pausedSong = {};
      return new Promise((resolve, reject) => {
        cordova.plugins.Music.resumeSong(
            function (msg) {
                resolve(true);
            },
            function (e) {
                resolve(true);
            }
        );
      })
    } else {
      return new Promise((resolve, reject) => {
        this.pausedSong = {};
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
  }

  stopSong(){
    this.playingSong = {};
    cordova.plugins.Music.pauseSong(
        function (msg) {
            console.log("audio stopped");
        },
        function (e) {
            console.log("Error getting message=" + e);
        }
    );
  }

  pauseSong(){
    this.pausedSong = this.playingSong;
    this.playingSong = {};
    cordova.plugins.Music.pauseSong(
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
  		this.pauseSong();
  	} else {
  		this.playSong(playlist, obj).then(playStatus => { this.playingSong = {}; });
  	}
  }

  stopPlayState(){
    this.stopSong();
    this.navCtrl.push(this.selectPage);
  }

  isPlayingSong(playlist, obj){
    return (this.playingSong.id == obj.id && this.playingSong.playlist == playlist);
  }

  toggleMenu(menuId) {
   this.menuCtrl.enable(true, menuId).open().then(menu => {this.openMenu = this.openMenu; console.log(menuId); });
  }

  isMenuOpen(menuId) {
   return this.openMenu == menuId;
  }


  showConfirm() {
    var confirm = this.alertCtrl.create({
      title: 'Encerrar reprodução',
      message: 'Tem certeza que deseja encerrar esta reprodução?',
      buttons: [
        {
          text: 'cancelar',
          handler: () => {
            confirm.dismiss();
            return false;
          }
        },
        {
          text: 'finalizar',
          handler: () => {
            confirm.dismiss().then(nav => this.stopPlayState());
          }
        }
      ],
      enableBackdropDismiss : false
    });
    confirm.present();
  }

}
