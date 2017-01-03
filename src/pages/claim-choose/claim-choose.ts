import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ClaimBirthdayPage } from '../claim-birthday/claim-birthday'
import { Policy } from '../../models/policy';
import { PolicyService } from '../../services/policy.service';

@Component({
  selector: 'page-claim-choose',
  templateUrl: 'claim-choose.html',
  providers: [PolicyService]

})
export class ClaimChoosePage implements OnInit {

  policies: Policy[];
  chosenPet: boolean = false;

  constructor(
    public navCtrl: NavController,
    private policyService: PolicyService
  ) {}

  getPolicies(): void {
    this.policyService.getPolicies().then(policies => this.policies = policies);
  }

  ngOnInit(): void {
    this.getPolicies();
  }

  choosePet(policy) {
    this.navCtrl.push(ClaimBirthdayPage, policy);
  }
}
