import { Component } from '@angular/core';

import { NavController, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { PaymentPage } from '../payment/payment';

import { AccountProvider } from '../../providers/account.provider';
import { Account } from '../../models/account';

@Component({
  selector: 'page-billing',
  templateUrl: 'billing.html',
  providers: [AccountProvider]
})
export class BillingPage {

  loading;
  account:Account;
  display_name = '';
  display_premium = '';
  display_billing_day = '';
  display_account_status = '';
  display_amount_due = '';
  display_address_line1:string = '';
  display_address_line2:string = '';
  display_address_line3:string = '';
  display_cc_num = '';
  display_policy_warning = false;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    private loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private accountProvider: AccountProvider
  ) {
    viewCtrl.willEnter.subscribe(() => {
      this.getAccount();
    });
  }

  display_days = [
     '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th','10th',
    '11th','12th','13th','14th','15th','16th','17th','18th','19th','20th',
    '21st','22nd','23rd','24th','25th','26th','27th','28th','29th','30th',
    '31st'
  ];

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

    toast.present();
  }

  getAccount(): void {
    this.presentLoading();
    this.accountProvider.getAccountInfo()
    .finally(
      () => {
        this.closeLoading();
      }
    )
    .subscribe(
      (account) => {
        this.account = account;
        this.display_policy_warning = account.status === "Suspended";
        this.display_premium = account.monthly_premium;
        this.display_account_status = account.status;
        this.display_billing_day = this.display_days[account.billing_day - 1];
        this.display_amount_due = account.past_due_ammount;
        this.display_cc_num = '****' + account.credit_card_last4;

        let contact = account.primary_contact;
        this.display_name = contact.first_name + " " + contact.last_name;

        let address = account.billing_address;
        this.display_address_line1 = address.street;
        this.display_address_line2 = address.city + ", " + address.state_province;
        this.display_address_line3 = address.postal_code;
      }
    )
  }

  retryPayment() {
    this.presentLoading();
    this.accountProvider.retryAccountPayment()
    .finally(
      () => {
        this.closeLoading();
      }
    )
    .subscribe(
      (success) => {
        if (success) {
          this.navCtrl.pop();
          this.presentToast('Your policy is active and we look forward to protecting your pets for years to come!')
        }
        else {
          this.presentToast('We are sorry there was a problem completing your request. Please try again.');
          // TODO: Handle Error
        }
      }
    );
  }

  toPayment() {
    this.navCtrl.push(PaymentPage);
  }
}
