import { Component } from '@angular/core';

import { NavController, NavParams, MenuController, ViewController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ReimbursementPage } from '../reimbursement/reimbursement';

@Component({
  selector: 'page-claim-summary',
  templateUrl: 'claim-summary.html'
})
export class ClaimSummaryPage {

  chosenPet;
  user = {
    reimbursementType: 'Direct Deposit'
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public viewCtrl: ViewController) {

    this.chosenPet = navParams.data;

  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }

  toReimbursement() {
    this.navCtrl.push(ReimbursementPage);
  }

  goHome() {
    this.menu.close();
    this.navCtrl.setRoot(HomePage);
  }
}
