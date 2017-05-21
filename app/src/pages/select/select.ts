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
  playlist: any;

  constructor(public navCtrl: NavController, private platform: Platform, private geolocation: Geolocation, private alertCtrl: AlertController, private insomnia: Insomnia, private file: File) {
      this.playlist = 'principal';

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

  }
