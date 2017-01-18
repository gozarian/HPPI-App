import { Component } from '@angular/core';

import { NavController, ViewController } from 'ionic-angular';
import { PaymentPage } from '../payment/payment';

import { AccountProvider } from '../../providers/account.provider';
import { Account } from '../../models/account';

@Component({
  selector: 'page-billing',
  templateUrl: 'billing.html',
  providers: [AccountProvider]
})
export class BillingPage {

  account:Account;
  display_name = '';
  display_premium = '';
  display_address_line1:string = '';
  display_address_line2:string = '';
  display_address_line3:string = '';

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    private accountProvider: AccountProvider
  ) {
    viewCtrl.willEnter.subscribe(() => {
      this.getAccount();
    });
  }

  getAccount(): void {
    this.accountProvider.getAccountInfo().subscribe(
      (account) => {
        this.account = account;
        this.display_premium = account.monthly_premium;

        let contact = account.primary_contact;
        this.display_name = contact.first_name + " " + contact.last_name;
        // this.display_email = contact.email;
        //
        let address = account.billing_address;
        this.display_address_line1 = address.street;
        this.display_address_line2 = address.city + ", " + address.state_province;
        this.display_address_line3 = address.postal_code;
      }
    )
  }

  toPayment() {
    this.navCtrl.push(PaymentPage);
  }
}
