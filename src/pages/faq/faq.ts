import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavController } from 'ionic-angular';
import { Environment } from '../../providers/environment';

@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html'
})
export class FAQPage {

  faqUrl: SafeResourceUrl;

  constructor(public navCtrl: NavController, private sanitizer: DomSanitizer, private environment: Environment) {
    this.faqUrl = sanitizer.bypassSecurityTrustResourceUrl(environment.faqsUrl());
  }
}
