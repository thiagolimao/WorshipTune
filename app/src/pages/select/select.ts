import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';
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
  confirmAlert : any;
  public playingSong:any;

  constructor(public navCtrl: NavController, private platform: Platform, private geolocation: Geolocation, private alertCtrl: AlertController, private insomnia: Insomnia, private file: File) {
      this.activeSongs =  [];
      this.playlist = 'principal';
      this.activeSongs['principal'] = [];
      this.activeSongs['instrumental'] = [];
      this.searchTerm = '';
      this.playPage = PlayPage;
      this.playingSong = {};


      platform.ready().then(() => {
        this.insomnia.keepAwake()
        .then(
          () => console.log('Display ativado com sucesso'),
          () => console.log('Erro ao ativar display')
        );

      });

       this.getSongs().then(list => { this.filteredSongs = this.songs = list; console.log(this.songs); });

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

    filterItems(){
        this.filteredSongs = this.songs.filter((song) => {
              return song.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 || song.artist.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
          });
    }

    beginPlay(){
      this.navCtrl.push(this.playPage, {
        songs: this.songs,
        activeSongs: this.activeSongs,
        playingSong: this.playingSong
      });
    }

    iniciarReproducao() {
      if(this.activeSongs['principal'].length  <= 0 || this.activeSongs['instrumental'] <= 0){
        var confirmAlert = this.alertCtrl.create({
          title: 'Iniciar reprodução',
          message: 'Sua playlist está incompleta, deseja continuar?',
          buttons: [
            {
              text: 'voltar',
              handler: () => {
                confirmAlert.dismiss();
                return false;
              }
            },
            {
              text: 'avançar',
              handler: () => {
                confirmAlert.dismiss().then(nav => this.beginPlay());
              }
            }
          ],
          enableBackdropDismiss : false
        });

        confirmAlert.present();
      } else {
        this.beginPlay();
      }
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

  isPlayingSong(playlist, obj){
    return (this.playingSong.id == obj.id && this.playingSong.playlist == playlist);
  }


  }
