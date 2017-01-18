import { Component } from '@angular/core';

import { NavController, ViewController } from 'ionic-angular';
import { AccountProvider } from '../../providers/account.provider';

import { Account } from '../../models/account';

@Component({
  selector: 'page-personal-info',
  templateUrl: 'personal-info.html',
  providers: [AccountProvider]
})
export class PersonalInfoPage {

  account:Account;
  display_name:string = '';
  display_phone:string = '';
  display_email:string = '';
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
    })
  }

  getAccount(): void {
    this.accountProvider.getAccountInfo().subscribe(
      (account) => {
        this.account = account;

        let contact = account.primary_contact;
        this.display_name = contact.first_name + " " + contact.last_name;
        this.display_email = contact.email;
        this.display_phone = contact.primary_phone;

        let address = account.billing_address;
        this.display_address_line1 = address.street;
        this.display_address_line2 = address.city + ", " + address.state_province;
        this.display_address_line3 = address.postal_code;
      }
    )
  }
}
