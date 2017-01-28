import { Component, ViewChild } from '@angular/core';

import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { ClaimPhotoPage } from '../claim-photo/claim-photo';
import { Policy } from '../../models/policy';

@Component({
  selector: 'page-claim-birthday',
  templateUrl: 'claim-birthday.html'
})
export class ClaimBirthdayPage {
  public myDate;
  @ViewChild('datePicker') datePicker;

  policy;
  prev_page_name = "";

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {

    this.policy = <Policy>(navParams.get('policy'));
    this.prev_page_name = navParams.get('prev_page_name');
  }

  noDateWarning() {
    let alert = this.alertCtrl.create({
      title: 'No Date Chosen',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText(this.prev_page_name);
    this.datePicker.open();
    console.log(this.myDate);
  }

  addPhoto(policy) {
    if (this.myDate == undefined) {
      this.noDateWarning();
      return;
    } else {
      this.navCtrl.push(ClaimPhotoPage, {policy:policy, prev_page_name:'Choose Date'});
    }
  }
}
