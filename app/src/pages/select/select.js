var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Insomnia } from '@ionic-native/insomnia';
import { File } from '@ionic-native/file';
var SelectPage = (function () {
    function SelectPage(navCtrl, platform, geolocation, alertCtrl, insomnia, file) {
        // constructor(public navCtrl: NavController) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.geolocation = geolocation;
        this.alertCtrl = alertCtrl;
        this.insomnia = insomnia;
        this.file = file;
        platform.ready().then(function () {
            _this.insomnia.keepAwake()
                .then(function () { return console.log('Display ativado com sucesso'); }, function () { return console.log('Erro ao ativar display'); });
            // get current position
            // geolocation.getCurrentPosition().then(pos => {
            //   let alert = this.alertCtrl.create({
            //     title: 'Low battery',
            //     subTitle: 'lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude,
            //     buttons: ['Dismiss']
            //   });
            //   alert.present();
            // });
            // this.file.resolveLocalFilesystemUrl(this.file.dataDirectory).then(entry =>
            //   {
            //     // let alert = this.alertCtrl.create({
            //     //   title: 'Mensagem',
            //     //   subTitle: entry,
            //     //   buttons: ['Dismiss']
            //     // });
            //     // alert.present();
            //     console.log();
            //   }
            // )
            cordova.file.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
                console.log(fileSystem);
            });
            // this.file.checkDir(this.file.dataDirectory, 'mydir').then(_ => console.log('Directory exists')).catch(err => console.log('Directory doesnt exist'));
            // let filedir = file.documentsDirectory;
            // let filedir = 'Library';
            // console.log(this.file);
            // console.log(file.documentsDirectory);
            // let filedir = 'Library';
            // this.file.listDir(filedir, '').then(list => list.map(musicObj => console.log(musicObj.name)));
            // this.file.listDir(filedir, '').then(list => console.log(list));
            // const watch = geolocation.watchPosition().subscribe(pos => {
            //   console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
            // });
            // to stop watching
            // watch.unsubscribe();
        });
    }
    return SelectPage;
}());
SelectPage = __decorate([
    Component({
        selector: 'page-select',
        templateUrl: 'select.html'
    }),
    __metadata("design:paramtypes", [NavController, Platform, Geolocation, AlertController, Insomnia, File])
], SelectPage);
export { SelectPage };
//# sourceMappingURL=select.js.map