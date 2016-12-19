import { Component } from '@angular/core';

import { NavController, NavParams, MenuController, ViewController } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-claim-summary',
  templateUrl: 'claim-summary.html'
})
export class ClaimSummaryPage {

  chosenPet = {
    img: '',
    name: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, public viewCtrl: ViewController) {

    this.chosenPet = {
      name: navParams.get('name'),
      img: navParams.get('img')
    }

  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }

  goHome() {
    this.menu.close();
    this.navCtrl.setRoot(HomePage);
  }
}
