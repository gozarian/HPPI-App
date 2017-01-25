import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';

import { HomePage } from '../home/home';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { ChangePasswordPage } from '../change-password/change-password';

import { Session } from '../../providers/session';
import { AccountProvider } from '../../providers/account.provider';

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html'
})
export class SignInPage {
  email = '';
  password = '';
  errorMessage = '';
  loading;
  tempPassword;

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private accountProvider: AccountProvider,
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

      this.accountProvider.getAccountInfo().retry(1).subscribe(
        (account) => {
          this.tempPassword = account.password_reset;
          this.closeLoading();

          if (this.tempPassword) {
            this.navCtrl.push(ChangePasswordPage, this.tempPassword);
          } else {
            this.navCtrl.setRoot(HomePage);
          }
        }
      );
    },
    error => {
      this.closeLoading();
      this.errorMessage = error.message;
    });
  }

  resetPassword() {
    this.presentLoading();
    this.closeLoading();
    this.navCtrl.push(ResetPasswordPage);
  }

  launch(url) {
    new InAppBrowser(url, '_system');
  }
}
