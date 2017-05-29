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
import { NavController, NavParams } from 'ionic-angular';
var PlayPage = (function () {
    function PlayPage(navCtrl, params) {
        this.navCtrl = navCtrl;
        this.params = params;
        this.songs = params.get("songs");
        this.activeSongs = params.get("activeSongs");
    }
    PlayPage.prototype.playSong = function (obj) {
        this.playingSong;
        cordova.plugins.Music.playSong(obj.id, function (msg) {
            console.log("audio completed");
        }, function (e) {
            console.log("Error getting message=" + e);
        });
    };
    PlayPage.prototype.stopSong = function () {
        cordova.plugins.Music.stopSong(function (msg) {
            console.log("audio stopped");
        }, function (e) {
            console.log("Error getting message=" + e);
        });
    };
    return PlayPage;
}());
PlayPage = __decorate([
    Component({
        selector: 'page-play',
        templateUrl: 'play.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams])
], PlayPage);
export { PlayPage };
//# sourceMappingURL=play.js.map