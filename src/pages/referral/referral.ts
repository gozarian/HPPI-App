import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-referral',
  templateUrl: 'referral.html'
})
export class ReferralPage {

  share: string;

  constructor(public navCtrl: NavController) {

    this.share="email";
  }

}
