import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavController } from 'ionic-angular';
import { Environment } from '../../providers/environment';

@Component({
  selector: 'page-referral',
  templateUrl: 'referral.html'
})
export class ReferralPage {

  referralUrl: SafeResourceUrl;

  constructor(public navCtrl: NavController, private sanitizer: DomSanitizer, private environment: Environment) {
    this.referralUrl = sanitizer.bypassSecurityTrustResourceUrl(environment.referralUrl());
  }

}
