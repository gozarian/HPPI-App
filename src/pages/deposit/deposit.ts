import { Component } from '@angular/core';
import { Camera } from 'ionic-native';

import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Deposit } from '../../models/deposit';
import { ReimbursementPage } from '../reimbursement/reimbursement';

@Component({
  selector: 'page-deposit',
  templateUrl: 'deposit.html'
})
export class DepositPage {
  public photos: Array<string> = [];
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

  addPhoto() {
    Camera.getPicture({
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
      correctOrientation: true
    }).then((imageData) => {
     this.photos.push(imageData);
    }, (err) => {

    });
  }

  deletePhoto(index: number) {
    this.photos.splice(index, 1);
  }

  saveDepositForm() {
    this.directDeposit.accountData = this.model;
    this.navCtrl.push(ReimbursementPage, this.directDeposit);
  }
}
