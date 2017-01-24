import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { matchPassword } from './match-password';
import { AccountProvider } from '../../providers/account.provider'

@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
  providers: [AccountProvider]
})
export class ChangePasswordPage implements OnInit {

  password: FormGroup;
  loading;
  saveEnabled = false;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private fb: FormBuilder,
    private accountProvider:AccountProvider
  ) {

  }

  ngOnInit() {
    this.password = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    }, { validator: matchPassword });
  }

  onSubmit() {
    // console.log(this.password.value, this.password.valid);
    this.updatePassword();
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

  public updatePassword() {
    this.presentLoading();
    return this.accountProvider.updatePassword(this.password.value.newPassword).subscribe(
      (success) => {
        this.closeLoading();
        if (success) {
          this.presentToast('Your password has been changed.')
          this.navCtrl.pop();
        }
      }
    );
  }
}
