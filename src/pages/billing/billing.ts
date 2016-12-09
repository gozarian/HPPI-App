import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { PaymentPage } from '../payment/payment';

@Component({
  selector: 'page-billing',
  templateUrl: 'billing.html'
})
export class BillingPage {

  constructor(public navCtrl: NavController) {

  }

  toPayment() {
    this.navCtrl.setRoot(PaymentPage);
  }

}
