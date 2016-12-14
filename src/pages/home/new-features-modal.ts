import { Component } from '@angular/core';
import { Platform, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-new-features',
  templateUrl: 'new-features-modal.html'
})
export class NewFeaturesPage {

  constructor(
    public platform: Platform,
    public viewCtrl: ViewController
  ) {}

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
