import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import { Insomnia } from '@ionic-native/insomnia';


@Component({
  selector: 'page-select',
  templateUrl: 'select.html'
})
export class SelectPage {
  constructor(public navCtrl: NavController, private platform: Platform, private geolocation: Geolocation, private alertCtrl: AlertController, private insomnia: Insomnia) {
  // constructor(public navCtrl: NavController) {
      platform.ready().then(() => {
        this.insomnia.keepAwake()
        .then(
          () => console.log('success'),
          () => console.log('error')
        );
        // get current position
        geolocation.getCurrentPosition().then(pos => {
          let alert = this.alertCtrl.create({
            title: 'Low battery',
            subTitle: 'lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude,
            buttons: ['Dismiss']
          });
          alert.present();
        });

        // const watch = geolocation.watchPosition().subscribe(pos => {
        //   console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
        // });

        // to stop watching
        // watch.unsubscribe();

      });

    }

  }
