import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { ClaimBirthdayPage } from '../claim-birthday/claim-birthday';

@Component({
  selector: 'page-policy',
  templateUrl: 'policy.html'
})
export class PolicyPage {

  policy;
  previousPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {

    this.policy = navParams.data;
    this.previousPage = this.navCtrl.last();
  }

  newClaim() {
    this.navCtrl.push(ClaimBirthdayPage, this.policy);
  }
}
