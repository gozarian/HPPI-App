import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { ClaimBirthdayPage } from '../claim-birthday/claim-birthday';
import { ClaimPhotoPage } from '../claim-photo/claim-photo';
import { Policy } from '../../models/policy';

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

    this.policy = <Policy>(navParams.get('policy'));
    this.previousPage = this.navCtrl.last();
  }

  newClaim() {
    if (this.policy.pet_joined_family_date == null) {
      this.navCtrl.push(ClaimBirthdayPage, {policy:this.policy, prev_page_name:'Policy'});
    }
    else {
      this.navCtrl.push(ClaimPhotoPage, {policy:this.policy, prev_page_name:'Policy'});
    }
  }
}
