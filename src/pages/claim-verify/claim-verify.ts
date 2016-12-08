import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { ClaimSummaryPage } from '../claim-summary/claim-summary';

@Component({
  selector: 'page-claim-verify',
  templateUrl: 'claim-verify.html'
})
export class ClaimVerifyPage {

  chosenPet = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.chosenPet = {
      name: navParams.get('name'),
      img: navParams.get('img')
    }
  }

  agree(pet) {
    this.navCtrl.push(ClaimSummaryPage, pet);
  }

}
