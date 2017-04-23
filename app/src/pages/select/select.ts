import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import { Insomnia } from '@ionic-native/insomnia';
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-select',
  templateUrl: 'select.html'
})
export class SelectPage {
  constructor(public navCtrl: NavController, private platform: Platform, private geolocation: Geolocation, private alertCtrl: AlertController, private insomnia: Insomnia, private file: File) {
  // constructor(public navCtrl: NavController) {

      platform.ready().then(() => {
        this.insomnia.keepAwake()
        .then(
          () => console.log('Display ativado com sucesso'),
          () => console.log('Erro ao ativar display')
        );
        // get current position
        // geolocation.getCurrentPosition().then(pos => {
        //   let alert = this.alertCtrl.create({
        //     title: 'Low battery',
        //     subTitle: 'lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude,
        //     buttons: ['Dismiss']
        //   });
        //   alert.present();
        // });

        // this.file.resolveLocalFileSystemURL(this.file.dataDirectory).then(entry =>
        //   {
        //     let alert = this.alertCtrl.create({
        //       title: 'Mensagem',
        //       subTitle: entry,
        //       buttons: ['Dismiss']
        //     });
        //     alert.present();
        //   }
        // )
        // this.file.checkDir(this.file.dataDirectory, 'mydir').then(_ => console.log('Directory exists')).catch(err => console.log('Directory doesnt exist'));
        // let filedir = file.library;
        let filedir = 'Library';
        // this.file.listDir(filedir, 'Download/Castelos & Ruínas - Bk\'').then(list => list.map(musicObj => console.log(musicObj.name)));
        this.file.listDir(filedir, '').then(list => console.log(list));


        // const watch = geolocation.watchPosition().subscribe(pos => {
        //   console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
        // });

        // to stop watching
        // watch.unsubscribe();

      });

    }

  }
