import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AccountProvider } from '../../providers/account.provider';

@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
  providers:[AccountProvider]
})
export class ResetPasswordPage {

  email='';

  constructor(
    public navCtrl: NavController,
    private accountProvider: AccountProvider
  ) {

  }

  resetPassword() {
    this.accountProvider.resetPassword(this.email).subscribe(
      (success) => {
        if (success) {
          this.navCtrl.pop();
        }
      }
    );
  }
}
