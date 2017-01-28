import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Claim } from '../../models/claim';
import { Policy } from '../../models/policy';

@Component({
  selector: 'page-my-claims-detail',
  templateUrl: 'my-claims-detail.html'
})
export class MyClaimsDetailPage {

  claim:Claim;
  policy:Policy;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {

    this.claim = <Claim>(navParams.get('claim'));
    this.policy = <Policy>(navParams.get('policy'));
  }
}
