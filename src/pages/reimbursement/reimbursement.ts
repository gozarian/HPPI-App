import { Component } from '@angular/core';

import { NavController, NavParams, ViewController, AlertController, PickerController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DepositPage } from '../deposit/deposit';

import { AccountProvider } from '../../providers/account.provider';

import { Address } from '../../models/address';
import { Account } from '../../models/account';

@Component({
  selector: 'page-reimbursement',
  templateUrl: 'reimbursement.html'
})
export class ReimbursementPage {
  reimbursement: string;
  addressForm: boolean = false;
  submitted = false;
  accountSelected = false;
  accountType = 'Choose Account Type';

  directDepositInfo: boolean = true;

  testUser = {
    name: 'Brian Jorgensen',
    street: '6806 Westminister Ave NE',
    unit: '',
    city: 'Elensburg',
    state: 'WA',
    zip: '98117'
  };

  model = <Address>({
    name: '',
    street: '',
    city: '',
    state_province: '',
    postal_code: '',
    country: ''
  });

  accounts = [
    {
      text: 'Checking'
    },
    {
      text: 'Savings'
    }
  ];

  display_address_line1 = '';
  display_address_line2 = '';
  display_address_line3 = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private accountProvider: AccountProvider,
    private alertCtrl: AlertController,
    private pickerCtrl: PickerController
  ) {
    viewCtrl.willEnter.subscribe(() => {
      this.getAccount();
    });
    this.reimbursement = "deposit";
  }

  getAccount(): void {
    this.accountProvider.getAccountInfo().subscribe(
      (account) => {

//        let contact = account.primary_contact;
        // this.display_name = contact.first_name + " " + contact.last_name;
        // this.display_email = contact.email;
        // this.display_phone = contact.primary_phone;

        let address = account.billing_address;
        this.display_address_line1 = address.street;
        this.display_address_line2 = address.city + ", " + address.state_province;
        this.display_address_line3 = address.postal_code;
      }
    );
  }

  updateAddress() {
    this.addressForm = !this.addressForm;
  }

  confirmChange() {
    let alert = this.alertCtrl.create({
      title: 'Confirm new address',
      cssClass: 'hp-alerts',
      message: 'Save new address?<p>' + this.model.street + '</p><p>' + this.model.city + ' ' + this.model.state_province + ', ' + this.model.postal_code + '</p>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.addressForm = false;
          }
        },
        {
          text: 'Save',
          handler: () => {
            console.log('Save clicked');
            this.submitted = true;
            this.addressForm = false;
            this.testUser.street = this.model.street;
            this.testUser.city = this.model.city;
            this.testUser.state = this.model.state_province;
            this.testUser.zip = this.model.postal_code;
          }
        }
      ]
    });
    alert.present();
  }

  selectAccountType() {
    let picker = this.pickerCtrl.create({
      cssClass: 'hp-picker',
      buttons: [
        {
          text: 'Done',
          handler: data => {
            console.log(data.accountTypes.text);
            this.accountSelected = true;
            this.accountType = data.accountTypes.text;
          }
        }
      ]
    });

    let column = {
      name: 'accountTypes',
      columnWidth: '100%',
      options: this.accounts
    };
    picker.addColumn(column);
    picker.present();
  }

  depositDetails() {
    this.navCtrl.push(DepositPage);
  }

  goHome() {
    this.navCtrl.setRoot(HomePage);
  }
}
