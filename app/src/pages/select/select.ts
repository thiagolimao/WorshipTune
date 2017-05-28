import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import { Insomnia } from '@ionic-native/insomnia';
import { File } from '@ionic-native/file';
// import { Music } from '@ionic-native/music';
declare let cordova: any;
@Component({
  selector: 'page-select',
  templateUrl: 'select.html'
})

export class SelectPage {

  songs: any;
  activeSongs: Array<any>;
  playlist: any;

  constructor(public navCtrl: NavController, private platform: Platform, private geolocation: Geolocation, private alertCtrl: AlertController, private insomnia: Insomnia, private file: File) {
      this.activeSongs =  [];
      this.playlist = 'principal';
      this.activeSongs['principal'] = [];
      this.activeSongs['instrumental'] = [];

      platform.ready().then(() => {
        this.insomnia.keepAwake()
        .then(
          () => console.log('Display ativado com sucesso'),
          () => console.log('Erro ao ativar display')
        );

      });

       this.getSongs().then(list => { this.songs = list; });

    }


    getSongs() {
        return new Promise((resolve, reject) => {
            cordova.plugins.Music.getSongs(
                function (list) {
                    console.log(list);
                    resolve(list);
                },
                function (e) {
                    reject(e);
                }
            );
        });
    }

    setActive(obj) {

      var index = this.activeSongs[this.playlist].indexOf(obj);
      if(index > -1)
        this.activeSongs[this.playlist].splice(index, 1);
      else
        this.activeSongs[this.playlist].push(obj);
      // console.log(this.activeSongs);
    }

    activeArray(obj) {
      // console.log(this.activeSongs.indexOf(obj) > -1);
      return this.activeSongs[this.playlist].indexOf(obj) > -1;
      // return true;
    }

    playSong(obj) {
      cordova.plugins.Music.playSong(
          //id of song
          obj.id,
          // onComplete callback
          function (msg) {
              console.log("audio completed");
          },
          // error callback
          function (e) {
              console.log("Error getting message=" + e);
          }
      );
    }

    stopSong(){
      cordova.plugins.Music.stopSong(
          // success callback
          function (msg) {
              console.log("audio stopped");
          },
          // error callback
          function (e) {
              console.log("Error getting message=" + e);
          }
      );
    }

  }
