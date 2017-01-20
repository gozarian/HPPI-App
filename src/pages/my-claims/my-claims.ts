import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { NavController, ViewController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MyClaimsDetailPage } from '../my-claims-detail/my-claims-detail';

import { ClaimProvider } from '../../providers/claim.provider';
import { PolicyProvider } from '../../providers/policy.provider';
import { Claim } from '../../models/claim';
import { Policy } from '../../models/policy';

@Component({
  selector: 'page-my-claims',
  templateUrl: 'my-claims.html',
  providers:[ClaimProvider, PolicyProvider]
})
export class MyClaimsPage {

  claims:Claim[] = [];
  policies:{ [id: string] : Policy; } = {};

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    private policyProvider:PolicyProvider,
    private claimProvider:ClaimProvider
  ) {
    viewCtrl.willEnter.subscribe(() => {
      this.getClaims();
    });
  }

  getClaims() {
    Observable.combineLatest(
      this.policyProvider.getPolicies(),
      this.claimProvider.getClaims()
    )
    .subscribe(
      (values) => {
      for (var policy of values[0]) {
        this.policies[policy.petId] = policy;
      }
      this.claims = values[1];
    });
  }

  goHome() {
    this.navCtrl.setRoot(HomePage);
  }

  openClaim(claim) {
    this.navCtrl.push(MyClaimsDetailPage, claim);
  }

}
