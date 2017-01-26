import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-my-claims-detail',
  templateUrl: 'my-claims-detail.html'
})
export class MyClaimsDetailPage {

  claim;
  policy;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {

    this.claim = navParams.data.petClaim;
    this.policy = navParams.data.petPolicy;
  }

}
