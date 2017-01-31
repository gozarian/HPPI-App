import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavController, LoadingController } from 'ionic-angular';
import { Environment } from '../../providers/environment';
import { InAppBrowser } from 'ionic-native';

@Component({
  selector: 'page-scoop-main',
  templateUrl: 'scoop-main.html'
})
export class ScoopMainPage implements OnInit {

  loading;
  scoopUrl: SafeResourceUrl;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private sanitizer: DomSanitizer,
    private environment: Environment) {
    this.scoopUrl = sanitizer.bypassSecurityTrustResourceUrl(environment.scoopUrl());
  }

  ngOnInit() {
    this.launch('http://hptest.info/blog/?nativeAppView=true');
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'crescent',
      duration: 2000
    });
    this.loading.present();
  }

  launch(url) {
    new InAppBrowser(url, '_blank');
  }

}
