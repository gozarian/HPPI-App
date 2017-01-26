import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-my-claims-detail',
  templateUrl: 'my-claims-detail.html'
})
export class MyClaimsDetailPage {

  claim;
  policy;
  eobUrl: SafeResourceUrl;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sanitizer: DomSanitizer
  ) {

    this.claim = navParams.data.petClaim;
    this.policy = navParams.data.petPolicy;
    this.eobUrl = sanitizer.bypassSecurityTrustResourceUrl(this.claim.eob_url);
  }

}
