import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavController, LoadingController } from 'ionic-angular';
import { Environment } from '../../providers/environment';

@Component({
  selector: 'page-referral',
  templateUrl: 'referral.html'
})
export class ReferralPage implements OnInit {

  loading;
  referralUrl: SafeResourceUrl;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private sanitizer: DomSanitizer,
    private environment: Environment)
    {
      this.referralUrl = sanitizer.bypassSecurityTrustResourceUrl(environment.referralUrl());
    }

    ngOnInit() {
      this.presentLoading();
    }

    presentLoading() {
      this.loading = this.loadingCtrl.create({
        spinner: 'crescent',
        duration: 2000
      });
      this.loading.present();
    }
}
