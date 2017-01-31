import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

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

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController
  ) {}

  ionViewDidLoad() {
    console.log('Hello OfflinePage Page');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
