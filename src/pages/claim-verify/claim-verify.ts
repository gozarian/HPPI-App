import { Component } from '@angular/core';

import { NavController, NavParams, ViewController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { ClaimSummaryPage } from '../claim-summary/claim-summary';
import { HomePage } from '../home/home';
import { Policy } from '../../models/policy';
import { ClaimProvider } from '../../providers/claim.provider';

@Component({
  selector: 'page-claim-verify',
  templateUrl: 'claim-verify.html',
  providers: [ClaimProvider]
})
export class ClaimVerifyPage {

  loading;
  policy;
  images;
  prev_page_name = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private claimProvider: ClaimProvider) {

    this.policy = <Policy>(navParams.get('policy'));
    this.images = <string[]>(navParams.get('photos'));
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

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Claim cancelled',
      duration: 3000,
      cssClass: 'hp-toasts',
      showCloseButton: true,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  confirmDisagree() {
    let alert = this.alertCtrl.create({
      title: 'Disagree with terms?',
      cssClass: 'hp-alerts',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.navCtrl.setRoot(HomePage);
            this.presentToast();
          }
        }
      ]
    });
    alert.present();
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText('Uploads');
  }

  agree() {
    this.presentLoading();
    this.claimProvider.submitClaim(this.policy.policy_number, this.policy.pet_id, this.images)
    .finally(() => {
      this.closeLoading();
    })
    .subscribe(() => {
      this.navCtrl.push(ClaimSummaryPage, this.policy);
    });
  }

}
