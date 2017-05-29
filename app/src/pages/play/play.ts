import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { FindPage }  from '../find/find';
declare let cordova: any;

@Component({
  selector: 'page-play',
  templateUrl: 'play.html'
})

export class PlayPage {

	public songs:any;
	public activeSongs:any;
	public playingSong:any;
	findPage : any;

	constructor(public navCtrl: NavController, public params: NavParams) {
		this.songs = params.get("songs");
		this.activeSongs = params.get("activeSongs");
		this.playingSong = null;
		this.findPage = FindPage;
	}

    playSong(obj) {
	this.playingSong = obj.id;
      cordova.plugins.Music.playSong(
          obj.id,
          function (msg) {
              console.log("audio completed");
          },
          function (e) {
              console.log("Error getting message=" + e);
          }
      );
    }

    stopSong(){
      this.playingSong = 0;
      cordova.plugins.Music.stopSong(
          function (msg) {
              console.log("audio stopped");
          },
          function (e) {
              console.log("Error getting message=" + e);
          }
      );
    }


    toggleSong(obj){
    	if(this.playingSong == obj.id){
    		this.stopSong();
    	} else {
    		this.playSong(obj);
    	}
    }

}
