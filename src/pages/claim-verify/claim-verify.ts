import { Component } from '@angular/core';

import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ClaimSummaryPage } from '../claim-summary/claim-summary';

@Component({
  selector: 'page-claim-verify',
  templateUrl: 'claim-verify.html'
})
export class ClaimVerifyPage {

  chosenPet;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {

    this.chosenPet = navParams.data;
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText('Uploads');
  }

  agree(pet) {
    this.navCtrl.push(ClaimSummaryPage, pet);
  }

}
