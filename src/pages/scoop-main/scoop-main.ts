import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavController, LoadingController } from 'ionic-angular';
import { Environment } from '../../providers/environment';

@Component({
  selector: 'page-scoop-main',
  templateUrl: 'scoop-main.html'
})
export class ScoopMainPage implements OnInit {

  @ViewChild('scoopFrame') iframe: ElementRef;
  loading;
  frameWindow;
  scoopUrl: SafeResourceUrl;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private sanitizer: DomSanitizer,
    private environment: Environment) {
    this.scoopUrl = sanitizer.bypassSecurityTrustResourceUrl(environment.scoopUrl());
  }

  ngOnInit() {
    this.presentLoading();
    this.frameWindow =  this.iframe.nativeElement.contentWindow;
    console.log(this.frameWindow);
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'crescent',
      duration: 2000
    });
    this.loading.present();
  }

  navBack() {
    // TODO: manuipulate iframe window history object
    // this.frameWindow.history.back()
  }

  navForward() {
    // TODO: manuipulate iframe window history object
    // this.frameWindow.history.go(1)
  }
}
