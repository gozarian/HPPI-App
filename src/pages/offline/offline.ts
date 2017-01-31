import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Splash page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-offline',
  templateUrl: 'offline.html'
})
export class OfflinePage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello OfflinePage Page');
  }

}
