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
import { PlayPage } from '../play/play';
var SelectPage = (function () {
    function SelectPage(navCtrl, platform, geolocation, alertCtrl, insomnia, file) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.geolocation = geolocation;
        this.alertCtrl = alertCtrl;
        this.insomnia = insomnia;
        this.file = file;
        this.activeSongs = [];
        this.playlist = 'principal';
        this.activeSongs['principal'] = [];
        this.activeSongs['instrumental'] = [];
        this.searchTerm = '';
        this.playPage = PlayPage;
        platform.ready().then(function () {
            _this.insomnia.keepAwake()
                .then(function () { return console.log('Display ativado com sucesso'); }, function () { return console.log('Erro ao ativar display'); });
        });
        this.getSongs().then(function (list) { _this.filteredSongs = _this.songs = list; });
    }
    SelectPage.prototype.getSongs = function () {
        return new Promise(function (resolve, reject) {
            cordova.plugins.Music.getSongs(function (list) {
                resolve(list);
            }, function (e) {
                reject(e);
            });
        });
    };
    SelectPage.prototype.setActive = function (obj) {
        var index = this.activeSongs[this.playlist].indexOf(obj);
        if (index > -1)
            this.activeSongs[this.playlist].splice(index, 1);
        else
            this.activeSongs[this.playlist].push(obj);
        // console.log(this.activeSongs);
    };
    SelectPage.prototype.activeArray = function (obj) {
        // console.log(this.activeSongs.indexOf(obj) > -1);
        return this.activeSongs[this.playlist].indexOf(obj) > -1;
        // return true;
    };
    SelectPage.prototype.playSong = function (obj) {
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
        });
    };
    SelectPage.prototype.stopSong = function () {
        cordova.plugins.Music.stopSong(
        // success callback
        function (msg) {
            console.log("audio stopped");
        }, 
        // error callback
        function (e) {
            console.log("Error getting message=" + e);
        });
    };
    SelectPage.prototype.filterItems = function () {
        var _this = this;
        this.filteredSongs = this.songs.filter(function (song) {
            return song.name.toLowerCase().indexOf(_this.searchTerm.toLowerCase()) > -1 || song.artist.toLowerCase().indexOf(_this.searchTerm.toLowerCase()) > -1;
        });
    };
    SelectPage.prototype.beginPlay = function () {
        this.navCtrl.push(this.playPage, {
            songs: this.songs,
            activeSongs: this.activeSongs
        });
    };
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