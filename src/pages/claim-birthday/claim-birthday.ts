import { Component, ViewChild } from '@angular/core';

import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { ClaimPhotoPage } from '../claim-photo/claim-photo';
import { Policy } from '../../models/policy';
import { PolicyProvider } from '../../providers/policy.provider';

@Component({
  selector: 'page-claim-birthday',
  templateUrl: 'claim-birthday.html',
  providers: [PolicyProvider]
})
export class ClaimBirthdayPage {
  public myDate;
  @ViewChild('datePicker') datePicker;

  policy:Policy;
  prev_page_name = "";

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private policyProvider:PolicyProvider
  ) {
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
  }

  updatePolicy() {
    if (this.myDate == undefined) {
      this.noDateWarning();
      return;
    } else {
      this.policyProvider.updatePolicyDatePetJoined(this.policy.pet_id, this.myDate)
      .subscribe(
        (success) => {
          if (success) {
            this.policy.pet_joined_family_date = this.myDate;
            this.navCtrl.push(ClaimPhotoPage, {policy:this.policy, prev_page_name:'Choose Date'});
          }
          else {
            // TODO: Show error
          }
      });
    }
  }
}
