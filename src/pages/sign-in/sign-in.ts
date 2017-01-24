import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';

import { HomePage } from '../home/home';
import { ResetPasswordPage } from '../reset-password/reset-password';

import { Session } from '../../providers/session';

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html'
})
export class SignInPage {
  email = '';
  password = '';
  errorMessage = '';
  loading;

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private session: Session
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

  login() {
    this.presentLoading();
    this.session.new(this.email, this.password).subscribe(() => {
      this.closeLoading();
      this.navCtrl.setRoot(HomePage);
    },
    error => {
      this.closeLoading();
      this.errorMessage = error.message;
    });
  }

  resetPassword() {
    this.navCtrl.push(ResetPasswordPage);
  }

  launch(url) {
    new InAppBrowser(url, '_system');
  }
}
