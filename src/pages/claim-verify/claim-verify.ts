import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

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

}
