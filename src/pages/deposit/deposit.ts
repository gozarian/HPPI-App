import { Component } from '@angular/core';
import { MicrOcr, MicrData } from 'ionic-native';

import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Deposit } from '../../models/deposit';
import { ReimbursementPage } from '../reimbursement/reimbursement';

@Component({
  selector: 'page-deposit',
  templateUrl: 'deposit.html'
})
export class DepositPage {
  public checkDetails: boolean = false;
  submitted = false;
  depositForm: boolean = false;

  directDeposit;

  model = new Deposit(
    '',
    '',
    ''
  );

  onSubmit() { this.submitted = true; }

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {

    this.directDeposit = navParams.data;
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText('Reimbursement');
  }

  startCapture() {
    MicrOcr.startLiveCapture().subscribe((captureData: MicrData) => {
      console.log(captureData);
    }, (err) => {
      console.log('err');
    });
  }

  saveDepositForm() {
    this.directDeposit.accountData = this.model;
    this.navCtrl.push(ReimbursementPage, this.directDeposit);
  }
}
