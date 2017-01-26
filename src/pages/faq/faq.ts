import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavController, LoadingController } from 'ionic-angular';
import { Environment } from '../../providers/environment';

@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html'
})
export class FAQPage implements OnInit {

  loading;
  faqUrl: SafeResourceUrl;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private sanitizer: DomSanitizer,
    private environment: Environment
  ) {
    this.faqUrl = sanitizer.bypassSecurityTrustResourceUrl(environment.faqsUrl());
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
