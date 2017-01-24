import { Component, OnInit } from '@angular/core';

import { NavController, LoadingController } from 'ionic-angular';
import { ClaimBirthdayPage } from '../claim-birthday/claim-birthday';
import { ClaimPhotoPage } from '../claim-photo/claim-photo';
import { Policy } from '../../models/policy';
import { PolicyProvider } from '../../providers/policy.provider';

@Component({
  selector: 'page-claim-choose',
  templateUrl: 'claim-choose.html',
  providers: [PolicyProvider]
})
export class ClaimChoosePage implements OnInit {

  loading;
  policies: Policy[];
  chosenPet: boolean = false;

  constructor(
    public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private policyProvider: PolicyProvider
  ) {}

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'crescent'
    });
    this.loading.present();
  }

  closeLoading() {
    if (this.loading == 'undefined') { return; };
    this.loading.dismiss();
  }

  getPolicies(): void {
    this.presentLoading();
    this.policyProvider.getPolicies().subscribe(
      (policies) => {
        this.policies = policies.filter(
          (policy) => {
            return policy.allow_claim;
          }
        );
        this.closeLoading();
      }
    );
  }

  ngOnInit(): void {
    this.getPolicies();
  }

  choosePet(policy) {
    if (policy.pet_joined_family_date == null) {
      this.navCtrl.push(ClaimBirthdayPage, policy);
    }
    else {
      this.navCtrl.push(ClaimPhotoPage, policy);
    }
  }
}
