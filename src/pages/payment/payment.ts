import { Component } from '@angular/core';

import { NavController, ViewController, LoadingController } from 'ionic-angular';
import { AccountProvider } from '../../providers/account.provider';

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
  providers: [AccountProvider]
})
export class PaymentPage {

  loading;
  showMonth: boolean = false;
  showYear: boolean = false;
  card = {
    month: '',
    year: '',
    state: ''
  };
  stateOptions = {
    title: 'Select Month'
  };

  states = [
    {"name":"Alabama","alpha-2":"AL"},
    {"name":"Alaska","alpha-2":"AK"},
    {"name":"Illinois","alpha-2":"IL"},
    {"name":"Indiana","alpha-2":"IN"},
    {"name":"Iowa","alpha-2":"IA"},
    {"name":"Montana","alpha-2":"MT"},
    {"name":"Rhode Island","alpha-2":"RI"},
    {"name":"Virginia","alpha-2":"VA"},
    {"name":"Washington","alpha-2":"WA"},
    {"name":"West Virginia","alpha-2":"WV"},
    {"name":"Wisconsin","alpha-2":"WI"},
    {"name":"Wyoming","alpha-2":"WY"}
  ];

  cc_num = '';
  cc_month = '';
  cc_year = '';
  cc_cvv = '';

  billing_name = '';
  billing_street = '';
  billing_city = '';
  billing_state = '';
  billing_postal_code = '';

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    private accountProvider:AccountProvider
  ) {
    viewCtrl.willEnter.subscribe(() => {
      this.getAccount();
    })
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

  getAccount(): void {
    this.presentLoading();
    this.accountProvider.getAccountInfo().subscribe(
      (account) => {
        let contact = account.primary_contact;
        this.billing_name = contact.first_name + " " + contact.last_name;

        let address = account.billing_address;
        this.billing_street = address.street;
        this.billing_city = address.city;
        this.billing_state = address.state_province;
        this.billing_postal_code = address.postal_code;
        this.closeLoading();
      }
    )
  }

  monthChange(value){
    this.showMonth = value;
  }
  yearChange(value){
    this.showYear = value;
  }

  savePaymentInfo() {
    this.accountProvider.updatePaymentInfo(
      this.cc_num,
      this.cc_month,
      this.cc_year,
      this.cc_cvv,
      this.billing_name,
      this.billing_street,
      this.billing_city,
      this.billing_state,
      this.billing_postal_code,
    )
    .subscribe(
      (success) => {
        if (success) {
          this.navCtrl.pop();
        }
        else {
          // TODO: Handle Error
        }
      }
    );
  }
}
