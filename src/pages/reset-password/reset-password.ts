import { Component } from '@angular/core';

import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';
import { AccountProvider } from '../../providers/account.provider';

@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
  providers:[AccountProvider]
})
export class ResetPasswordPage {

  loading;
  email='';
  errorMessage = '';


  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private accountProvider: AccountProvider
  ) {

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

  launch(url) {
    new InAppBrowser(url, '_system');
  }

  resetPassword() {
    this.errorMessage = '';
    this.presentLoading();
    this.accountProvider.resetPassword(this.email).subscribe(
      (success) => {
        this.closeLoading();
        if (success) {
          this.presentToast('A temporary password has been sent to your email.')
          this.navCtrl.pop();
        }
      },
      error => {
        this.closeLoading();
        this.errorMessage = error.message;
      }
    );
  }
}
