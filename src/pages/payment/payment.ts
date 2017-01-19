import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AccountProvider } from '../../providers/account.provider';

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
  providers: [AccountProvider]
})
export class PaymentPage {

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
  billing_unit_apt = '';
  billing_city = '';
  billing_state = '';
  billing_postal_code = '';

  constructor(
    public navCtrl: NavController,
    private accountProvider:AccountProvider
  ) {}

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
      this.billing_unit_apt,
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
