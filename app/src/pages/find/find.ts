import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SelectPage }  from '../select/select';

@Component({
  selector: 'page-find',
  templateUrl: 'find.html'
})

export class FindPage {
  selectPage : any;
  constructor(public navCtrl: NavController) {
  	this.selectPage = SelectPage;
  }

}
