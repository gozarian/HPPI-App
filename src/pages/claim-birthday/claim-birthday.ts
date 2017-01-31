import { Component, ViewChild } from '@angular/core';

import { NavController, NavParams, ViewController, AlertController, LoadingController, ToastController } from 'ionic-angular';
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

  loading;
  policy:Policy;
  prev_page_name = "";

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private policyProvider:PolicyProvider
  ) {
    this.policy = <Policy>(navParams.get('policy'));
    this.prev_page_name = navParams.get('prev_page_name');
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'crescent'
    });
    this.loading.present();
  }

  closeLoading() {
    if (this.loading == 'undefined') { return; };
    this.loading.dismiss();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      cssClass: 'hp-toasts',
      showCloseButton: true,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    console.log('start the toast');
    toast.present();
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
      this.presentLoading();
      this.policyProvider.updatePolicyDatePetJoined(this.policy.pet_id, this.myDate)
      .finally(
        () => {
          this.closeLoading();
        }
      )
      .subscribe(
        (success) => {
          if (success) {
            this.policy.pet_joined_family_date = this.myDate;
            this.presentToast('The date was updated.')
            this.navCtrl.push(ClaimPhotoPage, {policy:this.policy, prev_page_name:'Choose Date'});
          }
          else {
            this.presentToast('The date could not be updated.')
          }
      });
    }
  }
}
