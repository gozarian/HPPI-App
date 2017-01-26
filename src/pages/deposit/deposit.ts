import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from 'ionic-native';

import { NavController, LoadingController, ToastController, NavParams, ViewController } from 'ionic-angular';
import { Deposit } from '../../models/deposit';
import { ReimbursementPage } from '../reimbursement/reimbursement';
import { matchAccounts } from './match-accounts';

@Component({
  selector: 'page-deposit',
  templateUrl: 'deposit.html'
})
export class DepositPage implements OnInit {
  public photos: Array<string> = [];
  public checkDetails: boolean = false;
  depositForm: FormGroup;
  loading;

  directDeposit;

  model = new Deposit(
    '',
    '',
    ''
  );

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController,
    private fb: FormBuilder
  ) {

    this.directDeposit = navParams.data;
  }

  ngOnInit() {
    this.depositForm = this.fb.group({
      routingNumber: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      accountNumber: ['', [Validators.required]],
      confirmAccountNumber: ['', [Validators.required]]
    }, { validator: matchAccounts });
  }

  onSubmit() {
    this.saveDepositForm();
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText('Reimbursement');
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

    console.log('start the toast');
    toast.present();
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
    this.presentLoading();
    this.directDeposit.accountData = this.model;
    this.closeLoading();
    this.presentToast('Thank you for updating your reimbursement information.')
    this.navCtrl.push(ReimbursementPage, this.directDeposit);
  }
}
