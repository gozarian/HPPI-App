import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Session } from '../../providers/session';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html'
})
export class SignInPage {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private navCtrl: NavController, private session: Session) {

  }

  login() {
    this.session.new(this.email, this.password).subscribe(() => {
      this.navCtrl.setRoot(HomePage);
    },
    error => {
      this.errorMessage = error.message;
    });
  }

}
