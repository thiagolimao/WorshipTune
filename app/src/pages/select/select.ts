import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Insomnia } from '@ionic-native/insomnia';
import { File } from '@ionic-native/file';
import { PlayPage }  from '../play/play';
declare let cordova: any;
@Component({
  selector: 'page-select',
  templateUrl: 'select.html'
})

export class SelectPage {

  songs: any;
  filteredSongs: any;
  activeSongs: Array<any>;
  playlist: any;
  searchTerm: any;
  playPage : any;

  constructor(public navCtrl: NavController, private platform: Platform, private geolocation: Geolocation, private alertCtrl: AlertController, private insomnia: Insomnia, private file: File) {
      this.activeSongs =  [];
      this.playlist = 'principal';
      this.activeSongs['principal'] = [];
      this.activeSongs['instrumental'] = [];
      this.searchTerm = '';
      this.playPage = PlayPage;

      platform.ready().then(() => {
        this.insomnia.keepAwake()
        .then(
          () => console.log('Display ativado com sucesso'),
          () => console.log('Erro ao ativar display')
        );

      });

       this.getSongs().then(list => { this.filteredSongs = this.songs = list; });

    }


    getSongs() {
        return new Promise((resolve, reject) => {
            cordova.plugins.Music.getSongs(
                function (list) {
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
    }

    activeArray(obj) {
      return this.activeSongs[this.playlist].indexOf(obj) > -1;
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

    filterItems(){
        this.filteredSongs = this.songs.filter((song) => {
              return song.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 || song.artist.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
          });
    }

    beginPlay(){
      this.navCtrl.push(this.playPage, {
        songs: this.songs,
        activeSongs: this.activeSongs
      });
    }

    iniciarReproducao() {
      let confirm = this.alertCtrl.create({
        title: 'Iniciar reprodução',
        message: 'Sua playlist está incompleta, deseja continuar?',
        buttons: [
          {
            text: 'voltar',
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: 'avançar',
            handler: () => {
              console.log('Agree clicked');
            }
          }
        ]
      });
      confirm.present();
    }


  }
