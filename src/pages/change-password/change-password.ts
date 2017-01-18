import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Session } from '../../providers/session'
import { AccountProvider } from '../../providers/account.provider'

@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
  providers: [AccountProvider]
})
export class ChangePasswordPage {

  newPassword = '';
  confirmPassword = '';
  saveEnabled = false;

  constructor(public navCtrl: NavController, private accountProvider:AccountProvider) {

  }

  public validate() : boolean {
    if ( this.newPassword.length > 0 && this.newPassword === this.confirmPassword ) {
      return true;
    }

    return false;
  }

  public updatePassword() {
    this.accountProvider.updatePassword(this.newPassword);
  }
}
