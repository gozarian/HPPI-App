import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavController } from 'ionic-angular';
import { Environment } from '../../providers/environment';

@Component({
  selector: 'page-scoop-main',
  templateUrl: 'scoop-main.html'
})
export class ScoopMainPage {

  scoopUrl: SafeResourceUrl;

  constructor(public navCtrl: NavController, private sanitizer: DomSanitizer, private environment: Environment) {
    this.scoopUrl = sanitizer.bypassSecurityTrustResourceUrl(environment.scoopUrl());
  }

}
