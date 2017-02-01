import { Component } from '@angular/core';
import { Camera } from 'ionic-native';

import { NavController, NavParams } from 'ionic-angular';
import { ClaimBirthdayPage } from '../claim-birthday/claim-birthday';
import { ClaimPhotoPage } from '../claim-photo/claim-photo';
import { PolicyProvider } from '../../providers/policy.provider';
import { Policy } from '../../models/policy';

@Component({
  selector: 'page-policy',
  templateUrl: 'policy.html',
  providers:[PolicyProvider]
})
export class PolicyPage {

  policy;
  previousPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public policyProvider: PolicyProvider
  ) {

    this.policy = <Policy>(navParams.get('policy'));
    this.previousPage = this.navCtrl.last();
  }

  changePetImage() {
    Camera.getPicture({
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
    })
    .then(
      (imageData) => {
        this.policyProvider.updatePetImage(this.policy.pet_id, imageData)
        .subscribe((success) => {
          if (success) {
            this.reloadPolicy();
          }
        });
      },
      (err) => {

      }
    );
  }

  reloadPolicy() {
    this.policyProvider.getPolicies()
    .subscribe(
      (policies) => {
      for (var p of policies) {
        if (p.policy_number === this.policy.policy_number) {
          this.policy = p;
          break;
        }
      }
    });
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
