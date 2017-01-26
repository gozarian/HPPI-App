import { Component } from '@angular/core';

import { NavController, NavParams, ViewController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { ClaimSummaryPage } from '../claim-summary/claim-summary';
import { HomePage } from '../home/home';
import { Policy } from '../../models/policy';

@Component({
  selector: 'page-claim-verify',
  templateUrl: 'claim-verify.html'
})
export class ClaimVerifyPage {

  loading;
  policy;
  prev_page_name = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {

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

  agree(pet) {
    this.presentLoading();
    // Submit to claim goes here
    this.closeLoading();
    this.navCtrl.push(ClaimSummaryPage, pet);
  }

}
