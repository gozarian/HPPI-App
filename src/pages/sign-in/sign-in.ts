import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';

import { HomePage } from '../home/home';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { ChangePasswordPage } from '../change-password/change-password';

import { Session } from '../../providers/session';
import { AccountProvider } from '../../providers/account.provider';

/// <reference types="../../node_modules/@types/urbanairship-cordova/indes.d.ts" />

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

  login() {
    this.presentLoading();
    this.session.new(this.email, this.password)
    .finally(
      () => {
        this.closeLoading();
      }
    )
    .subscribe(
      (account) => {
          this.tempPassword = account.password_reset;

          if (this.tempPassword) {
            this.navCtrl.push(ChangePasswordPage, this.tempPassword);
          } else {
            this.setupUrbanAirship();
            this.navCtrl.setRoot(HomePage);
          }
      },
      error => {
        this.errorMessage = error.message;
      }
    )
  }

  setupUrbanAirship() {
    if (UAirship) {
      UAirship.getChannelID(function (channelID) {
         console.log("Channel: " + channelID)
      });
      UAirship.setUserNotificationsEnabled(true, () => {

      });
    }
  }

  resetPassword() {
    this.navCtrl.push(ResetPasswordPage);
  }

  // Loading Indicator
  presentLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'crescent'
    });
    this.loading.present();
  }

  closeLoading() {
    if (this.loading == 'undefined') {
      return;
    };
    this.loading.dismiss();
  }

  launch(url) {
    new InAppBrowser(url, '_system');
  }
}
