import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { InAppBrowser } from 'ionic-native';

import { NavController, ViewController, LoadingController } from 'ionic-angular';
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

  loading;
  claims:Claim[] = [];
  policies:{ [id: string] : Policy; } = {};
  noClaims: boolean = false;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    private loadingCtrl: LoadingController,
    private policyProvider:PolicyProvider,
    private claimProvider:ClaimProvider
  ) {
    viewCtrl.willEnter.subscribe(() => {
      this.getClaims();
    });
  }

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

  getClaims() {
    this.presentLoading();
    Observable.combineLatest(
      this.policyProvider.getPolicies(),
      this.claimProvider.getClaims()
    )
    .finally(
      () => {
        this.closeLoading();
      }
    )
    .subscribe(
      (values) => {
      for (var policy of values[0]) {
        this.policies[policy.pet_id] = policy;
      }
      this.claims = values[1];
      if (this.claims.length == 0) {
        this.noClaims = true;
      }
    });
  }

  goHome() {
    this.navCtrl.setRoot(HomePage);
  }

  openClaim(claim) {
    if (claim.status === 'Your Action Needed') {
      this.navCtrl.push(MyClaimsDetailPage, claim);
    }
    else {
      // TODO: Show EOB
      new InAppBrowser(claim.eob_url, '_system');
    }
  }
}
