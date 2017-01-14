import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ClaimBirthdayPage } from '../claim-birthday/claim-birthday'
import { Policy } from '../../models/policy';
import { PolicyProvider } from '../../providers/policy.provider';

@Component({
  selector: 'page-claim-choose',
  templateUrl: 'claim-choose.html',
  providers: [PolicyProvider]
})
export class ClaimChoosePage implements OnInit {

  policies: Policy[];
  chosenPet: boolean = false;

  constructor(
    public navCtrl: NavController,
    private policyProvider: PolicyProvider
  ) {}

  getPolicies(): void {
    this.policyProvider.getPolicies().subscribe(
      (policies) => {
        this.policies = policies
      }
    );
  }

  ngOnInit(): void {
    this.getPolicies();
  }

  choosePet(policy) {
    this.navCtrl.push(ClaimBirthdayPage, policy);
  }
}
